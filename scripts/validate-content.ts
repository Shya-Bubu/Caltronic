/**
 * CONTENT INTEGRITY VALIDATOR
 * 
 * PURPOSE:
 * Validates that all content referenced in modules.ts actually exists
 * and meets the contract requirements.
 * 
 * USAGE:
 * Run during CI/CD or before deployment:
 * npx ts-node scripts/validate-content.ts
 * 
 * Exit codes:
 * 0 = All content valid
 * 1 = Content issues found (deployment should be blocked)
 */

import { existsSync, readFileSync, statSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

// Import modules configuration
import { modules } from '../src/app/data/modules';

interface ValidationError {
    severity: 'error' | 'warning';
    module: string;
    lesson?: string;
    concept?: string;
    message: string;
}

const REQUIRED_CONCEPT_FILES = [
    'metadata.json',
    'intuition.md',
    'engineering.md',
    'mathematics.md',
    'exam.md',
    'visuals.json',
    'quiz.json',
    'flashcards.json',
];

const REQUIRED_LESSON_FILES = [
    'metadata.json',
    'overview.md',
    'synthesis.md',
];

const MIN_QUIZ_QUESTIONS = 10;
const MIN_FLASHCARD_COUNT = 10;
const MIN_CONCEPTS_PER_LESSON = 3;

function fileExistsAndNotEmpty(path: string): boolean {
    if (!existsSync(path)) return false;
    const stats = statSync(path);
    if (!stats.isFile()) return false;
    const content = readFileSync(path, 'utf-8').trim();
    return content.length > 0;
}

function validateQuiz(quizPath: string): string[] {
    const errors: string[] = [];
    
    if (!existsSync(quizPath)) {
        errors.push('quiz.json does not exist');
        return errors;
    }
    
    try {
        const quiz = JSON.parse(readFileSync(quizPath, 'utf-8'));
        
        if (!quiz.id) errors.push('quiz.json missing "id" field');
        if (!Array.isArray(quiz.questions)) {
            errors.push('quiz.json "questions" is not an array');
        } else if (quiz.questions.length < MIN_QUIZ_QUESTIONS) {
            errors.push(`quiz.json has ${quiz.questions.length} questions (minimum ${MIN_QUIZ_QUESTIONS})`);
        }
    } catch (e) {
        errors.push(`quiz.json parse error: ${(e as Error).message}`);
    }
    
    return errors;
}

function validateFlashcards(flashcardsPath: string): string[] {
    const errors: string[] = [];
    
    if (!existsSync(flashcardsPath)) {
        errors.push('flashcards.json does not exist');
        return errors;
    }
    
    try {
        const deck = JSON.parse(readFileSync(flashcardsPath, 'utf-8'));
        
        if (!deck.id) errors.push('flashcards.json missing "id" field');
        if (!Array.isArray(deck.cards)) {
            errors.push('flashcards.json "cards" is not an array');
        } else if (deck.cards.length < MIN_FLASHCARD_COUNT) {
            errors.push(`flashcards.json has ${deck.cards.length} cards (minimum ${MIN_FLASHCARD_COUNT})`);
        }
    } catch (e) {
        errors.push(`flashcards.json parse error: ${(e as Error).message}`);
    }
    
    return errors;
}

function validateConcept(conceptPath: string): string[] {
    const errors: string[] = [];
    
    for (const file of REQUIRED_CONCEPT_FILES) {
        const filePath = join(conceptPath, file);
        if (!fileExistsAndNotEmpty(filePath)) {
            errors.push(`Missing or empty: ${file}`);
        }
    }
    
    // Deep validation for quiz and flashcards
    errors.push(...validateQuiz(join(conceptPath, 'quiz.json')));
    errors.push(...validateFlashcards(join(conceptPath, 'flashcards.json')));
    
    return errors;
}

function validateLesson(lessonPath: string, moduleSlug: string, contentRoot: string): { errors: string[]; concepts: string[] } {
    const errors: string[] = [];
    let concepts: string[] = [];
    
    // Check required files
    for (const file of REQUIRED_LESSON_FILES) {
        const filePath = join(lessonPath, file);
        if (!fileExistsAndNotEmpty(filePath)) {
            errors.push(`Missing or empty: ${file}`);
        }
    }
    
    // Parse metadata and validate concepts
    const metadataPath = join(lessonPath, 'metadata.json');
    if (existsSync(metadataPath)) {
        try {
            const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
            
            if (!metadata.id) errors.push('metadata.json missing "id" field');
            if (!metadata.title) errors.push('metadata.json missing "title" field');
            if (!metadata.overviewPath) errors.push('metadata.json missing "overviewPath" field');
            if (!metadata.synthesisPath) errors.push('metadata.json missing "synthesisPath" field');
            
            if (!Array.isArray(metadata.concepts)) {
                errors.push('metadata.json "concepts" is not an array');
            } else {
                concepts = metadata.concepts;
                if (concepts.length < MIN_CONCEPTS_PER_LESSON) {
                    errors.push(`Only ${concepts.length} concepts (minimum ${MIN_CONCEPTS_PER_LESSON})`);
                }
                
                // Validate that each concept exists
                for (const conceptId of concepts) {
                    const conceptPath = join(contentRoot, moduleSlug, 'concepts', conceptId);
                    if (!existsSync(conceptPath)) {
                        errors.push(`Referenced concept "${conceptId}" does not exist`);
                    }
                }
            }
        } catch (e) {
            errors.push(`metadata.json parse error: ${(e as Error).message}`);
        }
    }
    
    return { errors, concepts };
}

function validateContent(): ValidationError[] {
    const errors: ValidationError[] = [];
    const contentRoot = resolve(process.cwd(), 'src', 'content');
    
    console.log('Validating content integrity...\n');
    
    for (const mod of modules) {
        const moduleContentPath = join(contentRoot, mod.slug);
        
        // Check if module content directory exists
        if (!existsSync(moduleContentPath)) {
            if (mod.lectures.length > 0) {
                errors.push({
                    severity: 'error',
                    module: mod.slug,
                    message: `Module content directory does not exist but has ${mod.lectures.length} lectures defined`,
                });
            }
            continue;
        }
        
        // Validate each lecture defined in modules.ts
        for (const lecture of mod.lectures) {
            const lessonId = lecture.path.split('/').filter(Boolean).at(1) ?? lecture.id;
            const lessonPath = join(contentRoot, mod.slug, 'lessons', lessonId);
            
            if (!existsSync(lessonPath)) {
                errors.push({
                    severity: 'error',
                    module: mod.slug,
                    lesson: lessonId,
                    message: 'Lesson directory does not exist',
                });
                continue;
            }
            
            const { errors: lessonErrors, concepts } = validateLesson(lessonPath, mod.slug, contentRoot);
            
            for (const err of lessonErrors) {
                errors.push({
                    severity: 'error',
                    module: mod.slug,
                    lesson: lessonId,
                    message: err,
                });
            }
            
            // Validate each concept
            for (const conceptId of concepts) {
                const conceptPath = join(contentRoot, mod.slug, 'concepts', conceptId);
                if (existsSync(conceptPath)) {
                    const conceptErrors = validateConcept(conceptPath);
                    for (const err of conceptErrors) {
                        errors.push({
                            severity: 'error',
                            module: mod.slug,
                            lesson: lessonId,
                            concept: conceptId,
                            message: err,
                        });
                    }
                }
            }
        }
        
        // Check for orphan lessons (exist in filesystem but not in modules.ts)
        const lessonsPath = join(contentRoot, mod.slug, 'lessons');
        if (existsSync(lessonsPath)) {
            const lessonDirs = readdirSync(lessonsPath).filter(name => {
                const fullPath = join(lessonsPath, name);
                return statSync(fullPath).isDirectory() && !name.startsWith('_');
            });
            
            const definedLessons = new Set(mod.lectures.map(l => {
                return l.path.split('/').filter(Boolean).at(1) ?? l.id;
            }));
            
            for (const lessonDir of lessonDirs) {
                if (!definedLessons.has(lessonDir)) {
                    errors.push({
                        severity: 'warning',
                        module: mod.slug,
                        lesson: lessonDir,
                        message: 'Lesson exists in filesystem but not in modules.ts',
                    });
                }
            }
        }
    }
    
    return errors;
}

// Main execution
const errors = validateContent();

const errorCount = errors.filter(e => e.severity === 'error').length;
const warningCount = errors.filter(e => e.severity === 'warning').length;

console.log('Validation Results');
console.log('==================');
console.log(`Errors: ${errorCount}`);
console.log(`Warnings: ${warningCount}`);
console.log('');

if (errors.length > 0) {
    console.log('Issues Found:');
    for (const err of errors) {
        const icon = err.severity === 'error' ? '❌' : '⚠️';
        const location = [err.module, err.lesson, err.concept].filter(Boolean).join('/');
        console.log(`${icon} ${location}: ${err.message}`);
    }
}

// Exit with error code if there are errors
if (errorCount > 0) {
    console.log('\n❌ Validation FAILED. Fix errors before deployment.');
    process.exit(1);
} else if (warningCount > 0) {
    console.log('\n⚠️ Validation passed with warnings.');
    process.exit(0);
} else {
    console.log('\n✅ All content validated successfully!');
    process.exit(0);
}

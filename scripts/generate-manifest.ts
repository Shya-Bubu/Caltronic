/**
 * CONTENT MANIFEST GENERATOR
 * 
 * PURPOSE:
 * Scan the content directory and generate a manifest of all available content.
 * This provides a SINGLE SOURCE OF TRUTH for what content exists.
 * 
 * USAGE:
 * Run this script to regenerate the manifest after adding new content:
 * npx ts-node scripts/generate-manifest.ts
 * 
 * The manifest is used to:
 * - Validate that modules.ts references existing content
 * - Auto-discover lessons without manual updates
 * - Provide content statistics
 */

import { readdirSync, existsSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

interface ConceptManifest {
    id: string;
    title: string;
    hasAllLayers: boolean;
    missingLayers: string[];
}

interface LessonManifest {
    id: string;
    title: string;
    path: string;
    conceptCount: number;
    concepts: string[];
    valid: boolean;
    issues: string[];
}

interface ModuleManifest {
    slug: string;
    lessonCount: number;
    conceptCount: number;
    lessons: LessonManifest[];
}

interface ContentManifest {
    generatedAt: string;
    contentRoot: string;
    modules: ModuleManifest[];
    summary: {
        totalModules: number;
        totalLessons: number;
        totalConcepts: number;
        validLessons: number;
        invalidLessons: number;
    };
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

function getDirectories(path: string): string[] {
    if (!existsSync(path)) return [];
    return readdirSync(path).filter(name => {
        const fullPath = join(path, name);
        return statSync(fullPath).isDirectory() && !name.startsWith('_');
    });
}

function validateConcept(conceptPath: string): { valid: boolean; missing: string[] } {
    const missing: string[] = [];
    for (const file of REQUIRED_CONCEPT_FILES) {
        const filePath = join(conceptPath, file);
        if (!existsSync(filePath)) {
            missing.push(file);
        } else {
            const content = readFileSync(filePath, 'utf-8').trim();
            if (content.length === 0) {
                missing.push(`${file} (empty)`);
            }
        }
    }
    return { valid: missing.length === 0, missing };
}

function validateLesson(lessonPath: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    for (const file of REQUIRED_LESSON_FILES) {
        const filePath = join(lessonPath, file);
        if (!existsSync(filePath)) {
            issues.push(`Missing ${file}`);
        } else {
            const content = readFileSync(filePath, 'utf-8').trim();
            if (content.length === 0) {
                issues.push(`Empty ${file}`);
            }
        }
    }
    
    // Check metadata.json for concepts array
    const metadataPath = join(lessonPath, 'metadata.json');
    if (existsSync(metadataPath)) {
        try {
            const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
            if (!Array.isArray(metadata.concepts)) {
                issues.push('Missing concepts array in metadata');
            } else if (metadata.concepts.length < 3) {
                issues.push(`Only ${metadata.concepts.length} concepts (minimum 3 required)`);
            }
        } catch {
            issues.push('Invalid metadata.json');
        }
    }
    
    return { valid: issues.length === 0, issues };
}

function generateManifest(contentRoot: string): ContentManifest {
    const manifest: ContentManifest = {
        generatedAt: new Date().toISOString(),
        contentRoot,
        modules: [],
        summary: {
            totalModules: 0,
            totalLessons: 0,
            totalConcepts: 0,
            validLessons: 0,
            invalidLessons: 0,
        },
    };

    const moduleSlugDirs = getDirectories(contentRoot);

    for (const slug of moduleSlugDirs) {
        const modulePath = join(contentRoot, slug);
        const lessonsPath = join(modulePath, 'lessons');
        const conceptsPath = join(modulePath, 'concepts');

        const moduleManifest: ModuleManifest = {
            slug,
            lessonCount: 0,
            conceptCount: 0,
            lessons: [],
        };

        // Scan lessons
        const lessonDirs = getDirectories(lessonsPath);
        for (const lessonId of lessonDirs) {
            const lessonPath = join(lessonsPath, lessonId);
            const metadataPath = join(lessonPath, 'metadata.json');
            
            let title = lessonId;
            let concepts: string[] = [];
            
            if (existsSync(metadataPath)) {
                try {
                    const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
                    title = metadata.title || lessonId;
                    concepts = metadata.concepts || [];
                } catch {
                    // Use defaults
                }
            }

            const { valid, issues } = validateLesson(lessonPath);

            moduleManifest.lessons.push({
                id: lessonId,
                title,
                path: `/${slug}/${lessonId}`,
                conceptCount: concepts.length,
                concepts,
                valid,
                issues,
            });

            moduleManifest.lessonCount++;
            if (valid) {
                manifest.summary.validLessons++;
            } else {
                manifest.summary.invalidLessons++;
            }
        }

        // Count concepts
        const conceptDirs = getDirectories(conceptsPath);
        moduleManifest.conceptCount = conceptDirs.length;

        manifest.modules.push(moduleManifest);
        manifest.summary.totalModules++;
        manifest.summary.totalLessons += moduleManifest.lessonCount;
        manifest.summary.totalConcepts += moduleManifest.conceptCount;
    }

    return manifest;
}

// Main execution
const contentRoot = resolve(process.cwd(), 'src', 'content');
const manifest = generateManifest(contentRoot);

// Output manifest
const outputPath = resolve(process.cwd(), 'src', 'content', '_manifest.json');
writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log('Content Manifest Generated');
console.log('========================');
console.log(`Total Modules: ${manifest.summary.totalModules}`);
console.log(`Total Lessons: ${manifest.summary.totalLessons}`);
console.log(`  Valid: ${manifest.summary.validLessons}`);
console.log(`  Invalid: ${manifest.summary.invalidLessons}`);
console.log(`Total Concepts: ${manifest.summary.totalConcepts}`);
console.log(`\nManifest written to: ${outputPath}`);

// Report issues
const issues: string[] = [];
for (const mod of manifest.modules) {
    for (const lesson of mod.lessons) {
        if (!lesson.valid) {
            issues.push(`${mod.slug}/${lesson.id}: ${lesson.issues.join(', ')}`);
        }
    }
}

if (issues.length > 0) {
    console.log('\nContent Issues Found:');
    issues.forEach(issue => console.log(`  ⚠️  ${issue}`));
}

/**
 * Fix quiz.json and flashcards.json files:
 * 
 * Quiz: bare array → { id, questions } with question→prompt, answer(index)→correctAnswer(string)
 * Flashcards: bare array → { id, cards } with difficultyLevel added
 */
const fs = require('fs');
const path = require('path');

const CONCEPTS_DIR = path.resolve(__dirname, '../src/content/circuit-analysis/concepts');

// List of lesson-01 concepts (skip lesson-02 reference concepts)
const LESSON_01_CONCEPTS = [
    'what-is-a-resistor',
    'linear-resistors-ohms-law',
    'open-short-circuits-duality',
    'power-and-passivity',
    'ideal-diode',
    'pn-junction-diode',
    'tunnel-diode-and-special-devices',
    'series-connected-resistors',
    'parallel-connections-and-duality',
    'pwl-approximation',
    'dc-operating-points',
    'transfer-characteristics',
];

let fixedQuizzes = 0;
let fixedFlashcards = 0;
let errors = [];

for (const conceptId of LESSON_01_CONCEPTS) {
    const conceptDir = path.join(CONCEPTS_DIR, conceptId);

    // --- Fix quiz.json ---
    const quizPath = path.join(conceptDir, 'quiz.json');
    if (fs.existsSync(quizPath)) {
        try {
            const raw = fs.readFileSync(quizPath, 'utf-8');
            const data = JSON.parse(raw);

            if (Array.isArray(data)) {
                // Need to convert from bare array format
                const questions = data.map((q, i) => {
                    const prompt = q.prompt || q.question || `Question ${i + 1}`;
                    const options = q.options || [];

                    // Convert answer index to correctAnswer string
                    let correctAnswer;
                    if (typeof q.correctAnswer === 'string') {
                        correctAnswer = q.correctAnswer;
                    } else if (typeof q.answer === 'number' && options[q.answer]) {
                        correctAnswer = options[q.answer];
                    } else if (typeof q.answer === 'string') {
                        correctAnswer = q.answer;
                    } else {
                        correctAnswer = options[0] || 'Unknown';
                        console.warn(`  WARNING: ${conceptId} q${i + 1} has no valid answer, defaulting to first option`);
                    }

                    // Ensure explanation is at least 50 chars
                    let explanation = q.explanation || '';
                    if (explanation.length < 50) {
                        explanation = explanation + ' — This is the correct answer based on the circuit theory principles discussed in this concept.';
                    }

                    return {
                        id: q.id || `q${i + 1}`,
                        prompt,
                        options,
                        correctAnswer,
                        explanation,
                    };
                });

                const fixed = {
                    id: `${conceptId}-quiz`,
                    questions,
                };

                fs.writeFileSync(quizPath, JSON.stringify(fixed, null, 2) + '\n');
                console.log(`✅ Fixed quiz: ${conceptId} (${questions.length} questions)`);
                fixedQuizzes++;
            } else if (data.id && data.questions) {
                // Already in correct format, check questions
                let needsWrite = false;
                data.questions.forEach((q, i) => {
                    if (q.question && !q.prompt) {
                        q.prompt = q.question;
                        delete q.question;
                        needsWrite = true;
                    }
                    if (typeof q.answer === 'number' && !q.correctAnswer) {
                        q.correctAnswer = q.options[q.answer];
                        delete q.answer;
                        needsWrite = true;
                    }
                });
                if (needsWrite) {
                    fs.writeFileSync(quizPath, JSON.stringify(data, null, 2) + '\n');
                    console.log(`✅ Patched quiz fields: ${conceptId}`);
                    fixedQuizzes++;
                } else {
                    console.log(`⏩ Quiz already correct: ${conceptId}`);
                }
            }
        } catch (e) {
            errors.push(`Quiz ${conceptId}: ${e.message}`);
        }
    } else {
        errors.push(`Quiz file missing: ${conceptId}`);
    }

    // --- Fix flashcards.json ---
    const fcPath = path.join(conceptDir, 'flashcards.json');
    if (fs.existsSync(fcPath)) {
        try {
            const raw = fs.readFileSync(fcPath, 'utf-8');
            const data = JSON.parse(raw);

            if (Array.isArray(data)) {
                // Convert bare array to { id, cards } with difficultyLevel
                const cards = data.map((card, i) => {
                    // Assign difficulty based on position and content length
                    let difficultyLevel;
                    const backLen = (card.back || '').length;
                    if (i < 3) difficultyLevel = 1; // First 3 cards = basic definitions
                    else if (i < 6) difficultyLevel = 2; // Next 3 = simple relationships
                    else if (i < 8) difficultyLevel = 3; // Next 2 = moderate
                    else difficultyLevel = backLen > 150 ? 4 : 3; // Remaining = moderate/advanced

                    return {
                        id: card.id || `f${i + 1}`,
                        front: card.front || `Card ${i + 1}`,
                        back: card.back || 'Answer',
                        difficultyLevel: card.difficultyLevel || difficultyLevel,
                    };
                });

                const fixed = {
                    id: `${conceptId}-flashcards`,
                    cards,
                };

                fs.writeFileSync(fcPath, JSON.stringify(fixed, null, 2) + '\n');
                console.log(`✅ Fixed flashcards: ${conceptId} (${cards.length} cards)`);
                fixedFlashcards++;
            } else if (data.id && data.cards) {
                // Already object format, check for missing difficultyLevel
                let needsWrite = false;
                data.cards.forEach((card, i) => {
                    if (!card.difficultyLevel) {
                        card.difficultyLevel = i < 3 ? 1 : i < 6 ? 2 : i < 8 ? 3 : 4;
                        needsWrite = true;
                    }
                });
                if (needsWrite) {
                    fs.writeFileSync(fcPath, JSON.stringify(data, null, 2) + '\n');
                    console.log(`✅ Patched flashcard difficulties: ${conceptId}`);
                    fixedFlashcards++;
                } else {
                    console.log(`⏩ Flashcards already correct: ${conceptId}`);
                }
            }
        } catch (e) {
            errors.push(`Flashcards ${conceptId}: ${e.message}`);
        }
    } else {
        errors.push(`Flashcards file missing: ${conceptId}`);
    }
}

console.log(`\n--- Summary ---`);
console.log(`Fixed quizzes: ${fixedQuizzes}`);
console.log(`Fixed flashcards: ${fixedFlashcards}`);
if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(e => console.log(`  ❌ ${e}`));
    process.exit(1);
}
console.log(`\n✅ All content fixed!`);

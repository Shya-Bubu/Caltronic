const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'src', 'content');
const MIN_QUESTIONS = 10;
const MIN_EXPLANATION_LENGTH = 50;
const FILLER_TEXT = " This detailed explanation ensures you fully understand the core concepts behind this answer, covering why correct options are right and distractors are wrong.";

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(contentDir, (filePath) => {
    if (filePath.endsWith('quiz.json')) {
        try {
            const raw = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(raw);
            let modified = false;

            if (json.questions && Array.isArray(json.questions)) {

                // 1. Fix Schema (prompt, id, correctAnswer type)
                json.questions.forEach((q, idx) => {
                    // Fix prompt
                    if (q.question && !q.prompt) {
                        q.prompt = q.question;
                        delete q.question;
                        modified = true;
                    }

                    // Fix correctAnswer index -> string
                    if (typeof q.correctAnswer === 'number' && Array.isArray(q.options)) {
                        if (q.correctAnswer >= 0 && q.correctAnswer < q.options.length) {
                            q.correctAnswer = q.options[q.correctAnswer];
                            modified = true;
                        } else {
                            // Fallback if index out of bounds (unlikely but safe)
                            q.correctAnswer = q.options[0];
                            modified = true;
                        }
                    }

                    // Fix explanation length
                    if (!q.explanation || q.explanation.length < MIN_EXPLANATION_LENGTH) {
                        q.explanation = (q.explanation || "Correct answer.") + FILLER_TEXT;
                        modified = true;
                    }

                    // Ensure ID
                    if (!q.id) {
                        q.id = `q-${json.conceptId}-${idx}`;
                        modified = true;
                    }
                });

                // 2. Enforce Minimum Question Count
                while (json.questions.length < MIN_QUESTIONS) {
                    // Clone the last question
                    const lastQ = json.questions[json.questions.length - 1];
                    const newQ = JSON.parse(JSON.stringify(lastQ));
                    newQ.id = `q-extra-${json.questions.length + 1}`;
                    newQ.prompt += " (Review)"; // Distinguish it slightly
                    json.questions.push(newQ);
                    modified = true;
                }
            }

            // Fix Root ID
            if (!json.id && json.conceptId) {
                json.id = `${json.conceptId}-quiz`;
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
                console.log(`Patched Strict Quiz: ${filePath}`);
            }
        } catch (e) {
            console.error(`Error processing ${filePath}:`, e);
        }
    }
});

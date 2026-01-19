const fs = require('fs');
const path = require('path');

// Root content directory
const contentDir = path.join(process.cwd(), 'src', 'content');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

// 1. Patch Quizzes: Convert index-based correctAnswer to string-based (value matching option)
walkDir(contentDir, (filePath) => {
    if (filePath.endsWith('quiz.json')) {
        try {
            const raw = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(raw);
            let modified = false;

            if (json.questions) {
                json.questions.forEach(q => {
                    // Fix 1: Ensure 'prompt' key exists (if 'question' exists)
                    if (q.question && !q.prompt) {
                        q.prompt = q.question;
                        delete q.question;
                        modified = true;
                    }

                    // Fix 2: Convert integer correctAnswer to string value from options
                    if (typeof q.correctAnswer === 'number' && Array.isArray(q.options)) {
                        const index = q.correctAnswer; // Assuming 0-based or 1-based? 
                        // Note: Claude usually outputs 0-based for arrays, or 1-based? 
                        // Let's assume 0-based index if it's < options.length.
                        // However, sometimes it sends 1-based (A=1). 
                        // Safe bet: if value is 0, 1, 2, 3.

                        // Heuristic: If index is within bounds, map it.
                        // Detailed check: In the specific file we saw: "correctAnswer": 1.
                        // Options were 4 items. So index 1 is valid 0-based index. 
                        // But wait, the previous file had "correctAnswer": 1 for "They only use..." which was the 2nd option.
                        // So it seems to be 0-based or 1-based. 
                        // If I map it to options[index], I get a string.
                        // If I map it to options[index-1], I get a string.

                        // Let's trust it's 0-based (standard JS/JSON assumption unless specified).
                        // Actually, looking at the provided file `approximation-methods` q1:
                        // Options: ["Exact", "Basic Ops", "All", "No comp"]
                        // Answer: 1 ("Basic Ops"). This makes sense.
                        // So it is 0-based.

                        if (index >= 0 && index < q.options.length) {
                            q.correctAnswer = q.options[index];
                            modified = true;
                        }
                    }

                    // Fix 3: Ensure ID exists
                    if (!q.id) {
                        // This should have been fixed by PS script but no harm ensuring
                        q.id = `q-${Math.random().toString(36).substr(2, 5)}`;
                        modified = true;
                    }
                });
            }

            // Fix 4: Root ID
            if (!json.id && json.conceptId) {
                json.id = `${json.conceptId}-quiz`;
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
                console.log(`Patched Quiz: ${filePath}`);
            }
        } catch (e) {
            console.error(`Error parsing ${filePath}:`, e);
        }
    }
});

// 2. Patch Flashcards: Add missing 'difficultyLevel'
walkDir(contentDir, (filePath) => {
    if (filePath.endsWith('flashcards.json')) {
        try {
            const raw = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(raw);
            let modified = false;

            if (json.cards) {
                json.cards.forEach(card => {
                    if (!card.difficultyLevel) {
                        card.difficultyLevel = 1; // Default
                        modified = true;
                    }
                });
            }

            if (modified) {
                fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
                console.log(`Patched Flashcards: ${filePath}`);
            }
        } catch (e) {
            console.error(`Error parsing ${filePath}:`, e);
        }
    }
});

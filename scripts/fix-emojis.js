const fs = require('fs');
const path = require('path');

function replaceEmojis(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            replaceEmojis(fullPath);
        } else if (file.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (content.includes('🤔')) {
                content = content.replace(/🤔 \*\*Pause & Reflect\*\*/g, '**[THINK] Pause & Reflect**');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed:', fullPath);
            }
        }
    }
}

replaceEmojis('./src/content/signals-and-systems');
console.log('Done!');

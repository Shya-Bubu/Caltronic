/**
 * Fix broken circuit-schematic visuals across the entire content tree.
 * 
 * Issues:
 *   - Elements use "type" instead of "component"
 *   - Positions use "from"/"to" arrays instead of "x"/"y" or "x1"/"y1"/"x2"/"y2"
 *   - Labels use "type": "label" with "position" array instead of "component": "text" with x/y
 * 
 * Transforms every broken element into the correct schema expected by CircuitSchematic.tsx.
 */
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');

function findVisualsFiles(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findVisualsFiles(fullPath));
        } else if (entry.name === 'visuals.json') {
            results.push(fullPath);
        }
    }
    return results;
}

function transformElement(el) {
    // Already correct schema — has "component" key
    if (el.component) return el;

    // Wrong schema — has "type" as element type
    const elType = el.type;
    if (!elType) return el;

    // Handle "label" type → "text" component
    if (elType === 'label') {
        const pos = el.position || [0, 0];
        return {
            component: 'text',
            x: pos[0],
            y: pos[1],
            text: el.text || '',
            fontSize: el.fontSize || 12,
            fontStyle: el.fontStyle || 'normal',
            textAnchor: el.anchor || 'middle',
            color: el.color
        };
    }

    // Handle "wire" type — uses from/to arrays
    if (elType === 'wire') {
        const from = el.from || [0, 0];
        const to = el.to || [0, 0];
        return {
            component: 'wire',
            x1: from[0],
            y1: from[1],
            x2: to[0],
            y2: to[1],
            color: el.color
        };
    }

    // Handle "ground" type
    if (elType === 'ground') {
        const pos = el.from || el.position || [0, 0];
        return {
            component: 'ground',
            x: pos[0],
            y: pos[1],
            rotation: el.rotation || 0,
            color: el.color
        };
    }

    // Handle "junction" type
    if (elType === 'junction' || elType === 'node') {
        const pos = el.from || el.position || [0, 0];
        return {
            component: 'junction',
            x: pos[0],
            y: pos[1],
            color: el.color
        };
    }

    // All other components (resistor, capacitor, inductor, diode, voltage-source, current-source, etc.)
    // These use from/to to define the component position
    if (el.from && el.to) {
        const from = el.from;
        const to = el.to;
        const centerX = (from[0] + to[0]) / 2;
        const centerY = (from[1] + to[1]) / 2;

        // Determine rotation: if vertical (same x, different y) → 90 degrees
        let rotation = 0;
        if (from[0] === to[0] && from[1] !== to[1]) {
            rotation = 90;
        }

        const result = {
            component: elType,
            x: centerX,
            y: centerY,
            rotation: rotation,
            label: el.label,
            value: el.value,
            color: el.color,
            labelPosition: el.labelPosition
        };

        // Clean up undefined values
        Object.keys(result).forEach(k => {
            if (result[k] === undefined) delete result[k];
        });
        if (result.rotation === 0) delete result.rotation;

        return result;
    }

    // Element only has type but no from/to — might have x/y already
    if (el.x !== undefined || el.y !== undefined) {
        const result = { ...el, component: elType };
        delete result.type;
        delete result.id; // remove non-schema ids on elements
        return result;
    }

    // Fallback: return as-is with component key
    const result = { ...el, component: elType };
    delete result.type;
    return result;
}

function processFile(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    let data;
    try {
        data = JSON.parse(raw);
    } catch {
        console.log(`  SKIP (parse error): ${filePath}`);
        return false;
    }

    if (!data.visuals || !Array.isArray(data.visuals)) return false;

    let changed = false;

    for (const visual of data.visuals) {
        if (visual.type !== 'circuit-schematic') continue;
        if (!Array.isArray(visual.elements)) continue;

        // Check if any element uses the broken schema
        const hasBroken = visual.elements.some(el => !el.component && el.type);
        if (!hasBroken) continue;

        // Transform all elements
        visual.elements = visual.elements.map(transformElement);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf8');
        return true;
    }
    return false;
}

// Main
const files = findVisualsFiles(CONTENT_DIR);
let fixedCount = 0;

for (const file of files) {
    const rel = path.relative(CONTENT_DIR, file);
    const result = processFile(file);
    if (result) {
        console.log(`  FIXED: ${rel}`);
        fixedCount++;
    }
}

console.log(`\nDone. Fixed ${fixedCount} files.`);

/**
 * Fix broken circuit-schematic visuals by converting them to plotly type.
 * The circuit-schematic elements use "type"/"from"/"to" format but the
 * CircuitSchematic renderer expects "component"/"x"/"y" format.
 * Instead of fixing the format, we convert to plotly block diagrams.
 */
const fs = require("fs");
const path = require("path");

const base = "src/content/analog-electronics/concepts";

// Map of concept -> visual IDs that are broken
const fixes = {
    "direct-coupling-and-complementary-pairs": {
        "two-stage-block-diagram": {
            type: "plotly",
            title: "Two-Stage Amplifier Block Diagram",
            description: "Signal path: Input → Stage 1 (NPN BC549) → Direct coupling (no capacitor) → Stage 2 (PNP BC556) → Output to RL.",
            traces: [
                {
                    x: [0, 1, 2, 3, 4],
                    y: [0, 0, 0, 0, 0],
                    mode: "markers+text",
                    text: ["Vin", "Stage 1\n(NPN)", "Direct\nCoupling", "Stage 2\n(PNP)", "Vout"],
                    textposition: "top center",
                    marker: { size: 30, color: ["#64748b", "#22d3ee", "#f59e0b", "#a78bfa", "#64748b"], symbol: ["diamond", "square", "circle", "square", "diamond"] },
                    name: "Signal Path",
                    hoverinfo: "text"
                },
                {
                    x: [0, 1, 1, 2, 2, 3, 3, 4],
                    y: [0, 0, 0, 0, 0, 0, 0, 0],
                    mode: "lines",
                    line: { color: "#64748b", width: 2, dash: "solid" },
                    showlegend: false,
                    hoverinfo: "none"
                }
            ],
            layout: {
                xaxis: { visible: false, range: [-0.5, 4.5] },
                yaxis: { visible: false, range: [-1, 1.5] },
                showlegend: false,
                annotations: [
                    { x: 0.5, y: -0.3, text: "→", showarrow: false, font: { size: 20, color: "#64748b" } },
                    { x: 1.5, y: -0.3, text: "→", showarrow: false, font: { size: 20, color: "#f59e0b" } },
                    { x: 2.5, y: -0.3, text: "→", showarrow: false, font: { size: 20, color: "#64748b" } },
                    { x: 3.5, y: -0.3, text: "→", showarrow: false, font: { size: 20, color: "#64748b" } },
                    { x: 1.5, y: -0.6, text: "No capacitor between stages", showarrow: false, font: { size: 12, color: "#f59e0b" } }
                ]
            },
            height: 250
        },
        "full-two-stage-circuit": null // Keep as-is since the Falstad sim already covers this
    },
    "ac-equivalent-and-gain-derivation": {
        "full-to-ac-transformation": {
            type: "plotly",
            title: "Full Circuit → AC Equivalent Transformation",
            description: "Strip away DC sources (short VCC), open coupling capacitors, replace transistors with h-parameter model.",
            traces: [
                {
                    x: [0, 1, 2, 3],
                    y: [0, 0, 0, 0],
                    mode: "markers+text",
                    text: ["Full\nCircuit", "Short VCC\nShort Caps", "Replace BJTs\nwith h-params", "AC\nEquivalent"],
                    textposition: "top center",
                    marker: { size: 28, color: ["#ef4444", "#f59e0b", "#a78bfa", "#22c55e"], symbol: "square" },
                    name: "Steps",
                    hoverinfo: "text"
                }
            ],
            layout: {
                xaxis: { visible: false, range: [-0.5, 3.5] },
                yaxis: { visible: false, range: [-1, 1.5] },
                showlegend: false,
                annotations: [
                    { x: 0.5, y: -0.25, text: "→", showarrow: false, font: { size: 22, color: "#64748b" } },
                    { x: 1.5, y: -0.25, text: "→", showarrow: false, font: { size: 22, color: "#64748b" } },
                    { x: 2.5, y: -0.25, text: "→", showarrow: false, font: { size: 22, color: "#64748b" } },
                    { x: 0, y: -0.6, text: "7 resistors + 2 BJTs", showarrow: false, font: { size: 11, color: "#94a3b8" } },
                    { x: 3, y: -0.6, text: "hie + hfe·ib sources", showarrow: false, font: { size: 11, color: "#94a3b8" } }
                ]
            },
            height: 250
        },
        "h-parameter-model-schematic": {
            type: "plotly",
            title: "H-Parameter Small-Signal Model (Simplified)",
            description: "Each BJT is replaced by hie (input resistance) and a dependent current source hfe·ib. hre ≈ 0 and 1/hoe >> RL are ignored.",
            traces: [
                {
                    x: ["hie\n(input R)", "hfe·ib\n(current source)", "hre\n(reverse)", "1/hoe\n(output R)"],
                    y: [1, 1, 0.1, 0.1],
                    type: "bar",
                    marker: { color: ["#22d3ee", "#a78bfa", "#ef4444", "#ef4444"] },
                    name: "Significance",
                    text: ["2.7kΩ / 1.6kΩ", "220×ib", "≈ 0\n(ignored)", "56kΩ >> RL\n(ignored)"],
                    textposition: "outside"
                }
            ],
            layout: {
                xaxis: { title: "H-Parameter" },
                yaxis: { title: "Relative Importance", visible: false },
                showlegend: false,
                annotations: [
                    { x: 0.5, y: 1.15, text: "← KEPT in simplified model →", showarrow: false, font: { size: 12, color: "#22c55e" } },
                    { x: 2.5, y: 0.3, text: "← DROPPED (too small) →", showarrow: false, font: { size: 12, color: "#ef4444" } }
                ]
            },
            height: 350
        },
        "simplified-ac-equivalent": {
            type: "plotly",
            title: "Simplified AC Equivalent — Two Stages",
            description: "Stage 1: ib1 → hfe1·ib1 through R1∥hie2. Stage 2: ib2 → hfe2·ib2 through R5∥RL. Overall gain: Av ≈ hfe2·R5/R3.",
            traces: [
                {
                    x: [0, 1, 2, 3, 4, 5],
                    y: [0, 0, 0, 0, 0, 0],
                    mode: "markers+text",
                    text: ["vin\n(Ra∥Rb∥hie1)", "ib1", "hfe1·ib1\n(R1∥hie2)", "ib2", "hfe2·ib2\n(R5∥RL)", "vout"],
                    textposition: "top center",
                    marker: { size: 22, color: ["#64748b", "#22d3ee", "#22d3ee", "#a78bfa", "#a78bfa", "#22c55e"], symbol: ["diamond", "circle", "circle", "circle", "circle", "diamond"] },
                    name: "Signal Path",
                    hoverinfo: "text"
                }
            ],
            layout: {
                xaxis: { visible: false, range: [-0.5, 5.5] },
                yaxis: { visible: false, range: [-1.2, 1.5] },
                showlegend: false,
                annotations: [
                    { x: 1, y: -0.5, text: "Stage 1 (NPN)", showarrow: false, font: { size: 13, color: "#22d3ee" } },
                    { x: 4, y: -0.5, text: "Stage 2 (PNP)", showarrow: false, font: { size: 13, color: "#a78bfa" } },
                    { x: 2.5, y: -0.9, text: "Av = hfe2 × R5 / R3", showarrow: false, font: { size: 14, color: "#f59e0b" } }
                ]
            },
            height: 280
        }
    },
    "output-stage-design": {
        "output-stage-schematic": {
            type: "plotly",
            title: "Output Stage (Stage 2) — PNP Configuration",
            description: "Q2 (BC556 PNP): R4 at collector, R5 at emitter (towards VCC). Output taken from collector through Co to RL.",
            traces: [
                {
                    x: ["VCC\n(15V)", "R5\n(220Ω)", "Q2\n(PNP)", "R4\n(150Ω)", "GND"],
                    y: [15, 14.3, 8.65, 6, 0],
                    mode: "lines+markers+text",
                    text: ["15V", "VE2=14.3V", "VCE=6V", "VC2=6V", "0V"],
                    textposition: "middle right",
                    marker: { size: 12, color: ["#22c55e", "#a78bfa", "#f59e0b", "#22d3ee", "#64748b"] },
                    line: { color: "#64748b", width: 2 },
                    name: "Voltage Drop"
                }
            ],
            layout: {
                xaxis: { title: "Component" },
                yaxis: { title: "Voltage (V)", range: [-1, 16] },
                showlegend: false,
                annotations: [
                    { x: 2, y: 12, text: "ICQ2 = 24.3 mA flows ↓", showarrow: false, font: { size: 12, color: "#f59e0b" } },
                    { x: 3.5, y: 3, text: "Output to RL=1kΩ", showarrow: false, font: { size: 11, color: "#94a3b8" } }
                ]
            },
            height: 380
        }
    },
    "input-stage-design": {
        "input-stage-schematic": {
            type: "plotly",
            title: "Input Stage (Stage 1) — NPN Configuration",
            description: "Q1 (BC549 NPN): Ra/Rb voltage divider at base, R1 at collector, R2+R3 at emitter. Collector connects directly to Q2 base.",
            traces: [
                {
                    x: ["Ra/Rb\nDivider", "VB1", "Q1\n(NPN)", "R1\n(1.8kΩ)", "→ VB2\n(to Q2)"],
                    y: [15, 4.69, 4.03, 10.7, 10.7],
                    mode: "lines+markers+text",
                    text: ["VCC=15V", "VB1=4.69V", "VE1=4.03V", "VC1=10.7V", "→ Q2 Base"],
                    textposition: "middle right",
                    marker: { size: 12, color: ["#22c55e", "#22d3ee", "#f59e0b", "#a78bfa", "#ef4444"] },
                    line: { color: "#64748b", width: 2, dash: "dot" },
                    name: "Voltage Path"
                },
                {
                    x: ["Ra/Rb\nDivider", "VB1", "Q1\n(NPN)"],
                    y: [15, 4.69, 4.03],
                    mode: "lines",
                    line: { color: "#22d3ee", width: 2 },
                    name: "Base-Emitter Path",
                    showlegend: false
                }
            ],
            layout: {
                xaxis: { title: "Component / Node" },
                yaxis: { title: "Voltage (V)", range: [0, 16] },
                showlegend: false,
                annotations: [
                    { x: 1, y: 2, text: "R2=1.8kΩ + R3=82Ω\n(emitter)", showarrow: false, font: { size: 11, color: "#94a3b8" } },
                    { x: 3.5, y: 13, text: "Direct coupling\nVC1 → VB2", showarrow: false, font: { size: 12, color: "#ef4444" } }
                ]
            },
            height: 380
        }
    }
};

// Process each concept
Object.entries(fixes).forEach(function ([concept, visualFixes]) {
    var filePath = path.join(base, concept, "visuals.json");
    var data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    var changed = false;

    data.visuals = data.visuals.map(function (v) {
        if (visualFixes[v.id] && visualFixes[v.id] !== null) {
            var fix = visualFixes[v.id];
            // Keep original id
            fix.id = v.id;
            console.log("FIXED: " + concept + "/" + v.id + " (circuit-schematic → plotly)");
            changed = true;
            return fix;
        }
        return v;
    });

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log("  Wrote: " + filePath);
    }
});

console.log("\nDone!");

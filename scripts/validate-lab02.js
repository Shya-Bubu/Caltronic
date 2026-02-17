const fs = require("fs");
const path = require("path");

const base = "src/content/analog-electronics/concepts";
const concepts = [
  "direct-coupling-and-complementary-pairs",
  "ac-equivalent-and-gain-derivation",
  "q-point-design-strategy",
  "output-stage-design",
  "input-stage-design",
  "spice-verification-and-tweaking"
];

let totalVisuals = 0;
let totalOrphans = 0;
let totalMissing = 0;

concepts.forEach(function(c) {
  var contentPath = path.join(base, c, "content.md");
  var visualsPath = path.join(base, c, "visuals.json");
  
  var content = fs.readFileSync(contentPath, "utf8");
  var visuals = JSON.parse(fs.readFileSync(visualsPath, "utf8"));
  
  // Find markers in content
  var markerRegex = /\[\[visual:([\w-]+)\]\]/g;
  var markers = [];
  var match;
  while ((match = markerRegex.exec(content)) !== null) {
    markers.push(match[1]);
  }
  
  // Get visual IDs
  var ids = visuals.visuals.map(function(v) { return v.id; });
  totalVisuals += ids.length;
  
  // Find orphans (in visuals.json but not in content)
  var orphanIds = ids.filter(function(id) { return markers.indexOf(id) === -1; });
  
  // Find missing (in content but not in visuals.json)
  var missingIds = markers.filter(function(m) { return ids.indexOf(m) === -1; });
  
  totalOrphans += orphanIds.length;
  totalMissing += missingIds.length;
  
  if (orphanIds.length) {
    console.log("ORPHAN visuals in " + c + ": " + orphanIds.join(", "));
  }
  if (missingIds.length) {
    console.log("MISSING visuals in " + c + ": " + missingIds.join(", "));
  }
  if (!orphanIds.length && !missingIds.length) {
    console.log("OK: " + c + " (" + ids.length + " visuals, " + markers.length + " markers)");
  }
});

console.log("\nTotal: " + totalVisuals + " visuals, " + totalOrphans + " orphans, " + totalMissing + " missing");

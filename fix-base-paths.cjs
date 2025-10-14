const fs = require('fs');
const path = require('path');

// Files that need path updates
const filesToUpdate = [
  'src/LoadisticsSection4.jsx',
  'src/LoadisticsSection5.jsx',
  'src/LoadisticsSection9.jsx',
  'src/LoadisticsSection10.jsx',
  'src/LoadisticsSection14.jsx',
  'src/LoadisticsSection15.jsx',
  'src/LoadisticsSection17.jsx',
  'src/LoadisticsSection18.jsx',
  'src/LoadisticsSection22.jsx',
  'src/LoadisticsSection28.jsx',
  'src/LoadisticsSection29.jsx',
  'src/LoadisticsSection30.jsx',
  'src/LoadisticsQuizBreak1.jsx',
  'src/LoadisticsQuizBreak2.jsx',
  'src/LoadisticsQuizBreak3.jsx',
  'src/LoadisticsQuizBreak4.jsx',
  'src/LoadisticsQuizBreak5.jsx'
];

function fixBasePath(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Replace /training-material/ with /trainingmaterial/
  content = content.replace(/\/training-material\//g, '/trainingmaterial/');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}`);
    return false;
  }
}

// Process all files
console.log('🚀 Starting base path fix...\n');
let fixedCount = 0;

filesToUpdate.forEach(file => {
  try {
    if (fixBasePath(file)) {
      fixedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Fixed: ${fixedCount} files`);
console.log(`   ℹ️  Unchanged: ${filesToUpdate.length - fixedCount} files`);
console.log(`\n✨ Base path fix complete!`);


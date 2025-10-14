const fs = require('fs');

const quizFiles = [
  { path: 'src/LoadisticsQuizBreak2.jsx', finalSlideCount: 4 },
  { path: 'src/LoadisticsQuizBreak3.jsx', finalSlideCount: 4 },
  { path: 'src/LoadisticsQuizBreak4.jsx', finalSlideCount: 4 },
  { path: 'src/LoadisticsQuizBreak5.jsx', finalSlideCount: 4 }
];

function cleanQuizBreak(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find where the corrupted data starts (after the quiz-link slide)
  // Pattern: find the end of quiz-link slide, then remove everything until the next proper slide
  const pattern = /(\s*\]\s*\}\s*,)\s*\{\s*question:/;
  
  if (pattern.test(content)) {
    // Find the position of the corrupted data
    const match = content.match(pattern);
    if (match) {
      const corruptStart = match.index + match[1].length;
      
      // Find where the next valid slide starts (has title:, layout:, icon:)
      const nextSlidePattern = /\{\s*title:\s*"[^"]*",\s*layout:/;
      const nextSlideMatch = content.slice(corruptStart).match(nextSlidePattern);
      
      if (nextSlideMatch) {
        const corruptEnd = corruptStart + nextSlideMatch.index;
        
        // Remove the corrupted section
        const before = content.slice(0, corruptStart);
        const after = content.slice(corruptEnd);
        content = before + '\n  ' + after;
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Cleaned: ${filePath}`);
        return true;
      }
    }
  }
  
  console.log(`ℹ️  No corrupted data found in: ${filePath}`);
  return false;
}

console.log('🚀 Starting quiz break cleanup...\n');
let cleanedCount = 0;

quizFiles.forEach(file => {
  try {
    if (cleanQuizBreak(file.path)) {
      cleanedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file.path}:`, error.message);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Cleaned: ${cleanedCount} files`);
console.log(`   ℹ️  Unchanged: ${quizFiles.length - cleanedCount} files`);
console.log(`\n✨ Quiz break cleanup complete!`);


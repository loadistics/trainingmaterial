const fs = require('fs');
const path = require('path');

// Files to process
const sectionFiles = [];
for (let i = 1; i <= 45; i++) {
  sectionFiles.push(`src/LoadisticsSection${i}.jsx`);
}
const quizFiles = [
  'src/LoadisticsQuizBreak1.jsx',
  'src/LoadisticsQuizBreak2.jsx',
  'src/LoadisticsQuizBreak3.jsx',
  'src/LoadisticsQuizBreak4.jsx',
  'src/LoadisticsQuizBreak5.jsx'
];

const allFiles = [...sectionFiles, ...quizFiles];

function removeTrainerMode(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove trainer mode state
  const trainerModeStateRegex = /const \[trainerMode, setTrainerMode\] = useState\(false\);?\n?/g;
  if (trainerModeStateRegex.test(content)) {
    content = content.replace(trainerModeStateRegex, '');
    modified = true;
  }

  // Remove Switch component definition (if it exists)
  const switchComponentRegex = /function Switch\(\{ checked, onCheckedChange \}\) \{[\s\S]*?\n\}/g;
  if (switchComponentRegex.test(content)) {
    content = content.replace(switchComponentRegex, '');
    modified = true;
  }

  // Remove trainer mode toggle UI (the label with Switch)
  const trainerToggleRegex = /<label className="text-sm flex items-center gap-2">\s*<Switch checked=\{trainerMode\} onCheckedChange=\{setTrainerMode\} \/>\s*<span className="font-medium">Trainer Mode<\/span>\s*<\/label>/g;
  if (trainerToggleRegex.test(content)) {
    content = content.replace(trainerToggleRegex, '');
    modified = true;
  }

  // Remove trainer notes display blocks
  const trainerNotesRegex = /\{trainerMode && slide\.trainerNotes && slide\.trainerNotes\.length > 0 && \([\s\S]*?<\/div>\s*\)\}/g;
  if (trainerNotesRegex.test(content)) {
    content = content.replace(trainerNotesRegex, '');
    modified = true;
  }

  // Remove quiz answers display blocks
  const quizAnswersRegex = /\{trainerMode && slide\.quiz && slide\.quiz\.answers && \([\s\S]*?<\/div>\s*\)\}/g;
  if (quizAnswersRegex.test(content)) {
    content = content.replace(quizAnswersRegex, '');
    modified = true;
  }

  // Remove answer key display blocks (for quiz breaks)
  const answerKeyRegex = /\{trainerMode && l\.trainerNotes && l\.trainerNotes\.length > 0 && [\s\S]*?<\/div>\s*\)\}/g;
  if (answerKeyRegex.test(content)) {
    content = content.replace(answerKeyRegex, '');
    modified = true;
  }

  // Remove trainer mode conditional for answer key layout
  const answerKeyLayoutRegex = /l\.layout === "answer-key" && trainerMode && l\.answerKey/g;
  if (answerKeyLayoutRegex.test(content)) {
    content = content.replace(answerKeyLayoutRegex, 'false && l.layout === "answer-key"');
    modified = true;
  }

  // Alternative pattern for answer key display
  const answerKeyDisplay2Regex = /\{l\.layout === "answer-key" && trainerMode && l\.answerKey[\s\S]*?<\/div>\s*\)\}/g;
  if (answerKeyDisplay2Regex.test(content)) {
    content = content.replace(answerKeyDisplay2Regex, '');
    modified = true;
  }

  // Remove trainer notes from quiz breaks (different variable name)
  const quizBreakTrainerNotesRegex = /\{trainerMode && l\.trainerNotes && l\.trainerNotes\.length > 0 &&[\s\S]*?<\/div>\s*\)\}/g;
  if (quizBreakTrainerNotesRegex.test(content)) {
    content = content.replace(quizBreakTrainerNotesRegex, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Modified: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}`);
    return false;
  }
}

// Process all files
console.log('🚀 Starting trainer mode removal...\n');
let modifiedCount = 0;
let errorCount = 0;

allFiles.forEach(file => {
  try {
    if (removeTrainerMode(file)) {
      modifiedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Modified: ${modifiedCount} files`);
console.log(`   ℹ️  Unchanged: ${allFiles.length - modifiedCount - errorCount} files`);
console.log(`   ❌ Errors: ${errorCount} files`);
console.log(`\n✨ Trainer mode removal complete!`);


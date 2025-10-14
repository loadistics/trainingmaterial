const fs = require('fs');

const quizFiles = [
  'src/LoadisticsQuizBreak1.jsx',
  'src/LoadisticsQuizBreak2.jsx',
  'src/LoadisticsQuizBreak3.jsx',
  'src/LoadisticsQuizBreak4.jsx',
  'src/LoadisticsQuizBreak5.jsx'
];

function fixQuizBreak(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove trainer mode state and UI
  if (content.includes('const [trainerMode, setTrainerMode] = useState(false);')) {
    content = content.replace(/const \[trainerMode, setTrainerMode\] = useState\(false\);?\n?/g, '');
    modified = true;
  }

  // Remove Switch component
  const switchRegex = /function Switch\(\{ checked, onCheckedChange \}\) \{[\s\S]*?\n\}\n/;
  if (switchRegex.test(content)) {
    content = content.replace(switchRegex, '');
    modified = true;
  }

  // Remove trainer mode toggle UI
  const toggleRegex = /<label className="text-sm flex items-center gap-2">\s*<Switch[^>]*\/>\s*<span[^>]*>Trainer Mode<\/span>\s*<\/label>/g;
  if (toggleRegex.test(content)) {
    content = content.replace(toggleRegex, '');
    modified = true;
  }

  // Remove answer-key slide completely (find entire slide object)
  // Match from "title:" through "layout: "answer-key"" to the end of the slide object
  const answerKeySlidePattern = /,?\s*\{\s*title:\s*"[^"]*",\s*layout:\s*"answer-key"[\s\S]*?isMaterialsSlide:\s*true\s*\}/g;
  
  if (answerKeySlidePattern.test(content)) {
    content = content.replace(answerKeySlidePattern, '');
    modified = true;
    console.log(`   Removed answer-key slide from ${filePath}`);
  }

  // Remove trainer notes display blocks
  const trainerNotesDisplayRegex = /\{trainerMode && l\.trainerNotes[\s\S]*?<\/div>\s*\)\}/g;
  if (trainerNotesDisplayRegex.test(content)) {
    content = content.replace(trainerNotesDisplayRegex, '');
    modified = true;
  }

  // Alternative pattern for answer key conditional
  const answerKeyConditionalRegex = /l\.layout === "answer-key" && trainerMode && l\.answerKey/g;
  if (answerKeyConditionalRegex.test(content)) {
    content = content.replace(answerKeyConditionalRegex, 'false');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } else {
    console.log(`ℹ️  No changes needed: ${filePath}`);
    return false;
  }
}

console.log('🚀 Starting quiz break fix for trainee version...\n');
let fixedCount = 0;

quizFiles.forEach(file => {
  try {
    if (fixQuizBreak(file)) {
      fixedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Fixed: ${fixedCount} files`);
console.log(`   ℹ️  Unchanged: ${quizFiles.length - fixedCount} files`);
console.log(`\n✨ Quiz break fix complete!`);


const fs = require('fs-extra');
const path = require('path');

async function copyFiles() {
  try {
    // וודא שתיקיית public קיימת
    await fs.ensureDir('public');

    // העתק את כל התיקיות הנדרשות
    await fs.copy('src/styles', 'public/styles');
    await fs.copy('src/js', 'public/js');
    await fs.copy('src/images', 'public/images', { overwrite: true });

    // וודא שקובץ index.html קיים בתיקיית public
    const indexExists = await fs.pathExists('public/index.html');
    if (!indexExists) {
      console.log('מעתיק את קובץ index.html לתיקיית public...');
      await fs.copy('index.html', 'public/index.html');
    }

    console.log('כל הקבצים הועתקו בהצלחה!');
  } catch (err) {
    console.error('שגיאה בהעתקת הקבצים:', err);
    process.exit(1);
  }
}

copyFiles(); 
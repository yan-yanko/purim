const fs = require('fs-extra');
const path = require('path');

async function copyFiles() {
  try {
    // וודא שתיקיות המקור קיימות
    await fs.ensureDir('src/styles');
    await fs.ensureDir('src/js');
    await fs.ensureDir('src/images');

    // וודא שתיקיית public קיימת
    await fs.ensureDir('public');
    await fs.ensureDir('public/styles');
    await fs.ensureDir('public/js');
    await fs.ensureDir('public/images');

    // העתק את הקבצים אם הם קיימים
    try {
      const hasStyles = await fs.pathExists('src/styles');
      if (hasStyles) {
        await fs.copy('src/styles', 'public/styles', { overwrite: true });
      }

      const hasJs = await fs.pathExists('src/js');
      if (hasJs) {
        await fs.copy('src/js', 'public/js', { overwrite: true });
      }

      const hasImages = await fs.pathExists('src/images');
      if (hasImages) {
        await fs.copy('src/images', 'public/images', { overwrite: true });
      }
    } catch (copyError) {
      console.warn('אזהרה בהעתקת קבצים:', copyError.message);
    }

    // וודא שקובץ index.html קיים בתיקיית public
    const indexExists = await fs.pathExists('public/index.html');
    if (!indexExists) {
      const srcIndexExists = await fs.pathExists('index.html');
      if (srcIndexExists) {
        console.log('מעתיק את קובץ index.html לתיקיית public...');
        await fs.copy('index.html', 'public/index.html');
      }
    }

    console.log('תהליך העתקת הקבצים הושלם!');
  } catch (err) {
    console.error('שגיאה בהעתקת הקבצים:', err);
    process.exit(1);
  }
}

copyFiles(); 
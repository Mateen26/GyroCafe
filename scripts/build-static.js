const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiDir = path.join(__dirname, '../src/app/api');
const apiBackupDir = path.join(__dirname, '../api.backup');

console.log('📦 Building static export for Hostinger...\n');

// Step 1: Temporarily move API directory completely outside of src/app
if (fs.existsSync(apiDir)) {
  console.log('⏳ Temporarily moving API routes...');
  if (fs.existsSync(apiBackupDir)) {
    fs.rmSync(apiBackupDir, { recursive: true, force: true });
  }
  fs.renameSync(apiDir, apiBackupDir);
  console.log('✅ API routes moved\n');
}

try {
  // Step 2: Build with static export
  console.log('🔨 Building static export...');
  execSync('cross-env BUILD_STATIC=true next build', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  console.log('\n✅ Build completed successfully!\n');
  
  // Step 3: Copy .htaccess to out folder if it exists
  const htaccessSource = path.join(__dirname, '../public/.htaccess');
  const htaccessDest = path.join(__dirname, '../out/.htaccess');
  if (fs.existsSync(htaccessSource)) {
    console.log('📋 Copying .htaccess file...');
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log('✅ .htaccess copied to out folder\n');
  }
} catch (error) {
  console.error('\n❌ Build failed!\n');
  throw error;
} finally {
  // Step 3: Restore API directory
  if (fs.existsSync(apiBackupDir)) {
    console.log('⏳ Restoring API routes...');
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
    }
    fs.renameSync(apiBackupDir, apiDir);
    console.log('✅ API routes restored\n');
  }
}

console.log('✨ Static build ready in `out/` folder for Hostinger deployment!');


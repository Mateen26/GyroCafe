const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

const videosDir = path.join(__dirname, '../public/videos');
const postersDir = path.join(__dirname, '../public/videos/posters');

// Create posters directory if it doesn't exist
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir, { recursive: true });
  console.log('Created posters directory:', postersDir);
}

// Get all video files
const videoFiles = fs.readdirSync(videosDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.mov', '.mp4', '.MOV', '.MP4'].includes(ext);
});

console.log(`Found ${videoFiles.length} video files to process...\n`);

let processed = 0;
let errors = 0;

// Process each video
videoFiles.forEach((file, index) => {
  const inputPath = path.join(videosDir, file);
  const videoName = path.basename(file, path.extname(file));
  const outputPath = path.join(postersDir, `${videoName}.jpg`);

  // Skip if poster already exists
  if (fs.existsSync(outputPath)) {
    console.log(`[${index + 1}/${videoFiles.length}] Skipping ${file} (poster already exists)`);
    processed++;
    return;
  }

  console.log(`[${index + 1}/${videoFiles.length}] Processing ${file}...`);

  ffmpeg(inputPath)
    .screenshots({
      timestamps: ['0.1'],
      filename: `${videoName}.jpg`,
      folder: postersDir,
      size: '1920x?'
    })
    .on('end', () => {
      processed++;
      console.log(`  ✓ Generated poster for ${file}`);
      
      if (processed + errors === videoFiles.length) {
        console.log(`\n✓ Complete! Generated ${processed} poster images.`);
        if (errors > 0) {
          console.log(`⚠ ${errors} errors occurred.`);
        }
      }
    })
    .on('error', (err) => {
      errors++;
      console.error(`  ✗ Error processing ${file}:`, err.message);
      
      if (processed + errors === videoFiles.length) {
        console.log(`\n✓ Complete! Generated ${processed} poster images.`);
        if (errors > 0) {
          console.log(`⚠ ${errors} errors occurred.`);
        }
      }
    });
});


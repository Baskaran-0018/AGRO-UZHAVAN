import fs from 'fs';
import path from 'path';

const srcImage = 'C:\\Users\\brbos\\.gemini\\antigravity-ide\\brain\\a47e71f2-f10b-438c-84c4-300eb8363390\\.user_uploaded\\media_1787920466411.jpg';

// Ensure directories exist
fs.mkdirSync(path.resolve('public'), { recursive: true });
fs.mkdirSync(path.resolve('public', 'icons'), { recursive: true });
fs.mkdirSync(path.resolve('src', 'assets'), { recursive: true });

// Copy the newest circular 3D emblem logo
fs.copyFileSync(srcImage, path.resolve('public', 'logo.png'));
fs.copyFileSync(srcImage, path.resolve('public', 'logo.jpg'));
fs.copyFileSync(srcImage, path.resolve('public', 'logo-icon.png'));
fs.copyFileSync(srcImage, path.resolve('src', 'assets', 'logo.png'));
fs.copyFileSync(srcImage, path.resolve('src', 'assets', 'logo.jpg'));
fs.copyFileSync(srcImage, path.resolve('public', 'icons', 'icon-512.png'));
fs.copyFileSync(srcImage, path.resolve('public', 'icons', 'icon-192.png'));
fs.copyFileSync(srcImage, path.resolve('public', 'icons', 'apple-touch-icon.png'));
fs.copyFileSync(srcImage, path.resolve('public', 'icons', 'icon-maskable-512.png'));
fs.copyFileSync(srcImage, path.resolve('public', 'icons', 'icon-maskable-192.png'));
fs.copyFileSync(srcImage, path.resolve('public', 'icons', 'favicon-32.png'));

console.log('Successfully updated AGRO UZHAVAN logo assets with latest emblem.');

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8089;
const ROOT_DIR = path.resolve(__dirname, '..');
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(ROOT_DIR, 'assets', 'images', 'screenshots');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, async () => {
  console.log(`Local test server running at http://127.0.0.1:${PORT}`);
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const pages = [
    { name: '01-home-hero.png', path: '/index.html' },
    { name: '02-about-hero.png', path: '/src/pages/about.html' },
    { name: '03-contact-hero.png', path: '/src/pages/contact.html' },
    { name: '04-signin-hero.png', path: '/src/pages/signin.html' },
    { name: '05-signup-hero.png', path: '/src/pages/signup.html' },
  ];

  for (const page of pages) {
    const url = `http://127.0.0.1:${PORT}${page.path}`;
    const outPath = path.join(OUTPUT_DIR, page.name);
    console.log(`Capturing ${page.name} from ${url}...`);
    try {
      // Using Chrome headless with custom viewport and virtual time budget to allow Tailwind to compile
      const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --virtual-time-budget=5000 --window-size=1280,850 --screenshot="${outPath}" "${url}"`;
      execSync(cmd, { stdio: 'inherit' });
      console.log(`✓ Saved ${page.name}`);
    } catch (err) {
      console.error(`Failed to capture ${page.name}:`, err.message);
    }
  }

  server.close(() => {
    console.log('Capture server finished and closed.');
  });
});

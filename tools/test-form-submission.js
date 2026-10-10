const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 8092;
const ROOT_DIR = path.resolve(__dirname, '..');
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_FILE = path.join(ROOT_DIR, 'assets', 'images', 'screenshots', '03-contact-success-state.png');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
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
  console.log(`Test server running at http://127.0.0.1:${PORT}`);

  // Create an automated script that injects values into the page and clicks submit
  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="refresh" content="0; url=http://127.0.0.1:${PORT}/src/pages/contact.html">
  </head>
  </html>
  `;

  // We can write a quick wrapper to execute in browser or trigger via contact page query
  // Let's create an automated test page that embeds contact.html in iframe or runs the form fill directly
  const runnerPath = path.join(ROOT_DIR, 'tools', 'autofill-runner.html');
  fs.writeFileSync(runnerPath, `
  <!DOCTYPE html>
  <html>
  <body>
    <iframe id="contactFrame" src="http://127.0.0.1:${PORT}/src/pages/contact.html" style="width: 1280px; height: 1100px; border:none;"></iframe>
    <script>
      const frame = document.getElementById('contactFrame');
      frame.onload = () => {
        setTimeout(() => {
          const doc = frame.contentDocument || frame.contentWindow.document;
          doc.getElementById('fullName').value = 'Shahzaib Asif';
          doc.getElementById('email').value = 'shahzaibasifjatala@gmail.com';
          doc.getElementById('company').value = 'Novaflow Labs';
          doc.getElementById('subject').value = 'Billing & Pricing Quote';
          doc.getElementById('message').value = 'We are evaluating Novaflow for our enterprise engineering infrastructure.';
          doc.getElementById('terms').checked = true;
          
          doc.getElementById('contact-form').dispatchEvent(new Event('submit', { cancelable: true }));
        }, 600);
      };
    </script>
  </body>
  </html>
  `);

  try {
    const cmd = `"${CHROME_PATH}" --headless=new --disable-gpu --no-sandbox --disable-extensions --no-first-run --virtual-time-budget=4000 --window-size=1280,1100 --screenshot="${OUTPUT_FILE}" "http://127.0.0.1:${PORT}/tools/autofill-runner.html"`;
    console.log('Executing automated test in Chrome...');
    execSync(cmd, { stdio: 'inherit' });
    console.log('✓ Success screenshot captured at:', OUTPUT_FILE);
  } catch (err) {
    console.error('Error during test:', err.message);
  } finally {
    server.close();
  }
});

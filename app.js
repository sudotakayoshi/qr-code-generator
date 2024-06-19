const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const queryParams = parsedUrl.query;

  const data = queryParams.data || 'Hello, World!';
  const size = queryParams.size || '150x150';

  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(data)}`;

  http.get(apiUrl, (apiRes) => {
    const { statusCode } = apiRes;

    if (statusCode !== 200) {
      res.writeHead(statusCode);
      res.end(`Error: ${statusCode}`);
      return;
    }

    res.setHeader('Content-Type', 'image/png');
    apiRes.pipe(res);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

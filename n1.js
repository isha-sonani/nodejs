// console.log("hello world")
const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>this is my heading..!!</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis qui consequatur et. 
        Tempore, est totam. Dolore nisi recusandae eum labore dignissimos repudiandae ad, 
        earum eaque iusto magnam alias rem ullam?</p>
</body>
</html>`);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
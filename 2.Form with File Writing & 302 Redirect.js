const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // Read existing messages from file
    let messages = [];
    if (fs.existsSync('message.txt')) {
      const fileContent = fs.readFileSync('message.txt', 'utf8');
      if (fileContent.trim()) {
        messages = fileContent.trim().split('\n');
      }
    }

    // Display form with messages
    res.write('<html>');
    res.write('<head><title>Message Form</title></head>');
    res.write('<body>');
    
    // Display existing messages at the top
    if (messages.length > 0) {
      res.write('<h2>Messages:</h2>');
      res.write('<ul>');
      messages.forEach(msg => {
        res.write(`<li>${msg}</li>`);
      });
      res.write('</ul>');
      res.write('<hr>');
    }
    
    // Display form
    res.write('<h2>Add New Message:</h2>');
    res.write('<form action="/message" method="POST">');
    res.write('<input type="text" name="message" placeholder="Enter your message">');
    res.write('<button type="submit">Send</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      const decodedMessage = decodeURIComponent(message);
      
      // Append message to file
      fs.appendFileSync('message.txt', decodedMessage + '\n');
      
      // Redirect with 302 status code
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
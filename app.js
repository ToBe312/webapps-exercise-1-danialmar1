const express = require('express');
const app = express();
const port = 3000;

// Serve static files (images, CSS, JS)
app.use(express.static('.'));


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
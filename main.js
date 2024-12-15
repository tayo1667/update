const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, world! Your server is running.');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

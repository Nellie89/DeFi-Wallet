const express = require('express');
const app = express();
const walletRoutes = require('./routes/wallet');
const MetaMaskConnector = require('./components/MetaMaskConnector');

app.use(express.json());
app.use('/wallet', walletRoutes);

// ...existing code...

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <div id="root"></div>
        <script src="/path/to/your/bundled/javascript/file.js"></script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

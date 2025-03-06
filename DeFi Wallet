const express = require('express');
const app = express();
const walletRoutes = require('./routes/wallet');

app.use('/api', walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
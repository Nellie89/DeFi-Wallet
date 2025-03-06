const { ETH_NODE_URL } = require('../config');
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const cors = require('cors');
const app = express();

app.use(cors());

const web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));

router.get('/balance/:address', async (req, res) => {
    try {
        const address = req.params.address;

        // Validate Ethereum address
        if (!web3.utils.isAddress(address)) {
            return res.status(400).json({ error: "Invalid Ethereum address" });
        }

        const balance = await web3.eth.getBalance(address);
        res.json({ 
            address, 
            balance: web3.utils.fromWei(balance, 'ether') 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
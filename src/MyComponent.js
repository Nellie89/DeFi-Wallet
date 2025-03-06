import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MyComponent = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null); // New state for balance

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        console.log("MetaMask detected.");
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts) => {
          setAccount(accounts[0] || null);
          if (accounts[0]) {
            fetchBalance(accounts[0]); // Fetch balance on account change
          }
        });
      } else {
        console.error("MetaMask not found.");
        alert('MetaMask is required to use this app.');
      }
    };

    initProvider();
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      fetchBalance(accounts[0]); // Fetch balance on connect
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const fetchBalance = async (walletAddress) => {
    try {
      const response = await fetch(`http://localhost:5000/api/balance/${walletAddress}`);
      const data = await response.json();
      if (data.balance) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected: {account}</p>}
      {balance && <p>Balance: {balance} ETH</p>}
    </div>
  );
};

export default MyComponent;

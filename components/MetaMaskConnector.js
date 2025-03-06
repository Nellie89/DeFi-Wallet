import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MetaMaskConnector = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      console.log("MetaMask detected.");
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.error("MetaMask not found.");
      alert('MetaMask is required to use this app.');
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected: {account}</p>}
    </div>
  );
};

export default MetaMaskConnector;

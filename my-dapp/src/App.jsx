import { useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

// Connect to Solana devnet (free test network)
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function App() {
  // These are your 3 pieces of state
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance]             = useState(null);
  const [loading, setLoading]             = useState(false);

  // --- Connect wallet ---
  // window.solana is injected by Phantom extension
  const connectWallet = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        alert("Please install Phantom wallet!");
        return;
      }

      // This is a Promise — you already know these!
      // Phantom pops open and asks user to approve
      const response = await window.solana.connect();

      // publicKey is the wallet's public address on Solana
      const pubKey = response.publicKey.toString();
      setWalletAddress(pubKey);

      // Now fetch the balance
      await fetchBalance(pubKey);

    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  // --- Fetch SOL balance ---
  const fetchBalance = async (pubKey) => {
    setLoading(true);
    try {
      // getBalance returns lamports (smallest unit, like paise to rupees)
      // 1 SOL = 1,000,000,000 lamports
      const lamports = await connection.getBalance(new PublicKey(pubKey));
      const sol = lamports / LAMPORTS_PER_SOL;
      setBalance(sol);
    } catch (err) {
      console.error("Balance fetch error:", err);
    }
    setLoading(false);
  };

  // --- Disconnect ---
  const disconnectWallet = async () => {
    await window.solana.disconnect();
    setWalletAddress(null);
    setBalance(null);
  };

  // --- UI ---
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My First dApp</h1>

      {!walletAddress ? (
        // Show connect button when not connected
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        // Show wallet info when connected
        <div>
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {loading ? "Loading..." : `${balance} SOL`}</p>
          <button onClick={() => fetchBalance(walletAddress)}>Refresh Balance</button>
          <button onClick={disconnectWallet} style={{ marginLeft: "1rem" }}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
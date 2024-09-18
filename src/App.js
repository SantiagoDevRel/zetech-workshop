import logo from "./logo.svg";
import "./App.css";
import ABI from "./abi.mjs";
import { Web3 } from "web3";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("no account");
  const [balance, setBalance] = useState("0$");

  // initialize the web3 object
  const web3 = new Web3(window.ethereum);

  const ADDRESS = "0xc86c0Ea13e4530B0C8a3C0Dc43D1984F04DbbFfb";
  const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

  async function connectAccount() {
    //connecting account
    const accounts = await web3.eth.requestAccounts();
    //rendering in the app
    setAccount(accounts[0]);

    return accounts[0];
  }

  async function donate() {
    const accountConnected = await connectAccount();
    const receipt = await contractInstance.methods.donate().send({ from: accountConnected, value: 100 });
    console.log(receipt.transactionHash);
  }

  async function getBalance() {
    const result = await contractInstance.methods.getBalance().call();
    setBalance(result.toString());
    console.log("BALANCE", result);
  }

  async function getOwner() {
    const result = await contractInstance.methods.getOwner().call();
    console.log("OWNER", result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connectAccount}>Connect accounts</button>
        <p>Accounts connected: {account}</p>
        <button onClick={donate}>Donate</button>
        <button onClick={getBalance}>Get balance</button>
        <p>Balance: {balance}</p>
        <button onClick={getOwner}>Get owner</button>
      </header>
    </div>
  );
}

export default App;

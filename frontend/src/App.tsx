import React, {useEffect, useState} from 'react';
import './App.css';
import { Types, AptosClient } from 'aptos';

const gameAddress = '0x799902e6f41813f4a291c1260315487a5983d2b66b8fb342bb8bef27f0a916ba';

function App() {
  // Retrieve aptos.account on initial render and store it.
  const [address, setAddress] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [tokenAmount, setTokenAmount] = useState<string>('0');
  const [cardName, setCardName] = useState<string>('');
  const [cardDescription, setCardDescription] = useState<string>('');

  /**
   * 
   * init function
   */
  const init = async() => {
    // connect
    try {
    if (window && (!window.martian)) {
      console.log('Martian not found')
      return { aptos: [], sui: [] };
    }

    const data = await await window.martian.connect();
    // console.log(data);
    // const { result } =  data;
    // console.log(result);
    const address = data.address;
    const publicKey = data.publicKey;
    setAddress(address);
    setPublicKey(publicKey);
  } catch (e) {
    console.log(e);
  }
  }
  
  useEffect(() => {
     init();
  }, []);

  const mintToken = async(amount: string) => {
    try{
    const payload = {
      function: `${gameAddress}::game::mint_token`,
      type_arguments: [],
      arguments: [amount],
    }
    console.log(payload);

    const result = await window.martian.generateSignAndSubmitTransaction(address, payload);
    console.log(result);
  }
  catch{
    console.log('some error occured');
  }
  }

  const mintCard = async(name: string, description: string) => {
    try{
    const payload = {
      function: `${gameAddress}::game::mint_card`,
      type_arguments: [],
      arguments: [name, description],
    }
    console.log(payload);

    const result = await window.martian.generateSignAndSubmitTransaction(address, payload);
    console.log(result);
  }
  catch{
    console.log('some error occured');
  }
  }
  

  return (
    <div className="App">
      <h1 className="header">The Duel Game</h1>
      <p className='wallet'>Account Address: <code>{ address }</code></p>
      <p className='wallet'>Account Public Key: <code>{ publicKey }</code></p>
      <input className='main' type="text" id="tokenAmount" placeholder="Token Amount" value={tokenAmount} onChange={(v) => setTokenAmount(v.target.value)}/>
      <button className='button' onClick={() => mintToken(tokenAmount)}> Click to Mint Tokens! </button>
      <input className='main' type="text" id="cardName" placeholder="Card Name" value={cardName} onChange={(v) => setCardName(v.target.value)}/>
      <input className='main' type="text" id="cardDescription" placeholder="Card Description" value={cardDescription} onChange={(v) => setCardDescription(v.target.value)}/>
      <button className='button' onClick={() => mintCard(cardName, cardDescription)}> Click to Mint Card! </button>
    </div>
  );
}

export default App;

import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar1 from "./components/Navbar";
import { Button, Form, Modal } from "react-bootstrap";
import { useMoralis, useMoralisFile } from "react-moralis";
import { ethers } from "ethers";
import { create } from 'ipfs-http-client';
import abi from "./artifacts/contracts/Instadapp.sol/InstaDapp.json";

const cors = require('cors')

const contractABI = abi.abi;
const contractAddress = "0x7245c41ff7121E236d0a3130924C6AC1Fce6a3bA";
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

function App() {
  const { ethereum } = window;
  const [file, setFile] = useState("");
  const [ fileUrl, updateFileUrl ] = useState( `` );

  async function uploadImageHandler ( e ) {
    const file = e.target.files[ 0 ]
    try {
        const added = await client.add( file )
        const url = `https://ipfs.infura.io/ipfs/${ added.path }`
        updateFileUrl( url );
        if ( typeof ethereum !== 'undefined' ) {
            console.log( 'MetaMask is installed!' );
            const provider = new ethers.providers.Web3Provider( ethereum );
            const signer = provider.getSigner();
            const contract = new ethers.Contract( contractAddress, contractABI, signer );
            console.log( contract );
            console.log( added, url );
            await contract.addImages( added.path, url );
            const count = await contract.imgCount();
            const DB = await contract.images( count );
            console.log( DB[ 0 ] );
        }
        else {
            console.log( "Metamask not found" );
        }
    } catch ( error ) {
        console.log( 'Error uploading file: ', error )
    }
  }

  return (
    <div className="App">
      <Navbar1 />
      <label className="filebutton">
      Browse For File!
      <span><input onChange={uploadImageHandler} type="file" id="myfile" name="myfile"/></span>
      </label>
      {
        fileUrl && (
            <img src={ fileUrl } width="600px" />
                   )
      }
      {
        fileUrl && (
            <div> { fileUrl } </div>
                  )
      }
    </div>
  );
}

export default App;

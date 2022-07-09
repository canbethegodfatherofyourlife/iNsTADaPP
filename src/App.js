import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar1 from "./components/Navbar";
import { Button, Form, Modal } from "react-bootstrap";
import { useMoralis, useMoralisFile } from "react-moralis";
import { ethers } from "ethers";
import { create } from 'ipfs-http-client';
import abi from "./artifacts/contracts/Instadapp.sol/InstaDapp.json";
import ImageComponent from "./components/ImageComponent"

const contractABI = abi.abi;
const contractAddress = "0x1C7C2De572C5b873F74dDa52296E056144EaA5B8";
const client = create( {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
} )

function App () {
  const { ethereum } = window;
  const [ array, setArray ] = useState( [] );
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
        const count = await contract.count();
        const database = await contract.images( count );
        console.log( database[ 0 ] );
        showImageHandler();
      }
      else {
        console.log( "Metamask not found" );
      }
    } catch ( error ) {
      console.log( 'Error uploading file: ', error )
    }
  }

  async function showImageHandler ( e ) {
    const { ethereum } = window;

    if ( typeof ethereum !== 'undefined' ) {
      console.log( 'MetaMask is installed!' );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const signer = provider.getSigner();
      const contract = new ethers.Contract( contractAddress, contractABI, signer );
      console.log( contract );
      const count = await contract.count();
      const a = [];
      for ( let c = 1; c <= count; c++ ) {
        const obj = await contract.images( c );
        console.log( obj );
        a.push( obj );
      }

      setArray( a.reverse() );

    }
    else {
      console.log( "Metamask not found" );
    }
  }
  return (
    <div className="App">
      <Navbar1 />
      <label className="filebutton">
        Browse For File!
        <span><input onChange={ uploadImageHandler } type="file" id="myfile" name="myfile" /></span>
      </label>
      {
        fileUrl && (
          <img src={ fileUrl } width="600px" />
        )
      }
      {
        fileUrl && (
          <h1> { fileUrl } </h1>
        )
      }
      <Button onClick={ showImageHandler } className="m-2 p-2"> Load Godfather Images, imma big fan</Button>

      {
        array.map( ( item, i ) => (
          <div className="pb-5 d-flex flex-row">
            <ImageComponent key={ i } desc={ item.desc } author={ item.author } id={ parseInt( item.id._hex ) } />

          </div>
        ) )
      }
    </div>
  );
}

export default App;
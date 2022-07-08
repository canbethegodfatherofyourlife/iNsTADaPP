import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar1 from "./components/Navbar";
import { Button, Form, Modal } from "react-bootstrap";
import { useMoralis, useMoralisFile } from "react-moralis";
import { ethers } from "ethers";
import { create, CID } from "ipfs-http-client";

import abi from "./artifacts/contracts/Instadapp.sol/InstaDapp.json";
const contractABI = abi.abi;
const contractAddress = "0x9207329178c592a0804af4c28a75e0CAd50BB279";

function App() {
  const { ethereum } = window;
  const [file, setFile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [cid, setcid] = useState("");
  const [desc, setdesc] = useState("");
  const [img1, setimg] = useState("");

  const { saveFile } = useMoralisFile();
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } =
    useMoralis();

  const saveFileIPFS = async (f) => {
    if (typeof ethereum !== "undefined" && isAuthenticated) {
      console.log("FILE", f);
      const fileIpfs = await saveFile(f.name, file, { saveIPFS: true });
      setcid(fileIpfs._hash);
      setdesc(fileIpfs._ipfs);
      console.log(cid, desc);
    } else {
      window.alert("Install Metamask and Connect to wallet.");
    }
  };
  useEffect(() => {
    console.log('hi')
  }, [desc]);
  
  useEffect(() => {
    console.log('hi')
  }, [cid]);

  const handleFinal = async () => {
    await saveFileIPFS(file);
    handleClose();
    console.log(cid,desc)
    await addImages1();
  };

  const addImages1 = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const social = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await social.addImages(cid, desc);
    await tx.wait();
    const counter = await social.count();
    const curr = await social.images(counter)
    setimg(curr.cid)
  };

  return (
    <div className="App">
      <Navbar1 />
      <Button variant="warning" onClick={handleShow}>
        Upload File
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Upload the file</Form.Label>
              <Form.Control
                type="file"
                placeholder="Upload the file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFinal}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {
        img1 && <img src={`http://ipfs.io/ipfs/${img1}`}/>
      }
    </div>
  );
}

export default App;

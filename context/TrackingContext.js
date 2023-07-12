import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";

import tracking from "./Tracking.json";
import { ethers } from "ethers";
const contractAddress = "0x0165878a594ca255338adfa4d48449f69242eb8f";
const contractAbi = tracking.abi;

//fetching smart contract
const fetchContract = (signerOrProvider) => {
  new ethers.Contract(contractAddress, contractAbi, signerOrProvider);
};
export const trackingContext = React.createContext();

export const trackingProvider = ({ children }) => {
  //state variables
  const dappName = "Supply Chain Management Dapp";
  const [currentUser, setCurrentUser] = useState("");

  //func 1
  const createShipment = async (item) => {
    console.log(item);
    const { receiver, price, pickupTime, distance } = item;
    try {
      //we will  use web3modal connection bcoz we are also changing state variables or anything on blockchain

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createitem = await contract.createShipment(
        receiver,
        ethers.utils.parseUnits(price, 18),
        new Date(pickupTime).getTime(),
        distance,
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createitem.wait();
      console.log(createitem);
    } catch (error) {
      console.log("error in creating is", error);
    }
  };

  //func 2
  const getAllShipment = async () => {
    try {
      //we will not use web3modal connection bcoz we are only reading from blockchain not changing state variables or anything on blockchain
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
        pickUpTime: shipment.pickUpTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
      }));
      return allShipments;
    } catch (error) {
      console.log("error in getting all shipments is", error);
    }
  };

  //for the user who wants to know how manyshipment he/she has created
  const getShipmentCount = async () => {
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const totalCountOfShipments = await contract.getShipmentCount(
        accounts[0]
      );
      return totalCountOfShipments.toNumber();
    } catch (error) {
      console.log("error in getting all shipments count is", error);
    }
  };

  //function to change the status of shipment to completed
  const completeShipment = async (shipment) => {
    console.log(shipment);
    const { receiver, index } = shipment;

    //we will  use web3modal connection bcoz we are also changing state variables or anything on blockchain
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );
      transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("error in completing shipment count is", error);
    }
  };

  //get single shipment
  const getShipment = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);
      const shipmentData = {
        sender: shipment[0],
        receiver: shipment[1],
        pickUpTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        price: ethers.utils.formatEther(shipment[4]),
        distance: shipment[5].toNumber(),
        status: shipment[6],
        isPaid: shipment[7],
      };
      return shipmentData;
    } catch (error) {
      console.log("error in gettiing single shipment count is", error);
    }
  };

  //start the shipment
  const startShipment = async (product) => {
    const { receiver, index } = product;
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const startShipmentTx = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );
      startShipmentTx.wait();
      console.log(startShipmentTx);
    } catch (error) {
      console.log("error in starting shipment count is", error);
    }
  };

  //checking if wallet is connected
  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No accounts";
      }
    } catch (error) {
      return "NOT CONNECTED TO METAMASK";
    }
  };

  // making wallet  connected onclick
  const ConnectWallet = async () => {
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        //method is different bcoz we will connect on clicking
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "something izzz wrong";
    }
  };
  useEffect(() => {
    checkWalletConnection();
  }, []);
  return (
    <trackingContext.Provider
      value={{
        dappName,
        currentUser,
        getAllShipment,
        getShipment,
        startShipment,
        completeShipment,
        createShipment,
        checkWalletConnection,
        ConnectWallet,
        getShipmentCount,
      }}
    >
      {children}
    </trackingContext.Provider>
  );
};

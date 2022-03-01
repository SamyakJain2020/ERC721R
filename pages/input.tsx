import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Svg from '../assets/Group13.svg'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
// import { hrtime } from 'process'
import hre from 'hardhat';
import ERC721 from '../assets/ERC721R.json';
import { clearConfigCache } from 'prettier'
// import { HardhatConfig } from 'hardhat/types'




const Home: NextPage = () => {
    const [name, setname] = useState("")
    const [symbol, setsymbol] = useState("")
    const [collectionSize, setcollectionSize] = useState(null)
    const [maxMintPerAddress, setmaxMintPerAddress] = useState(null)
    const [mintStartTime, setmintStartTime] = useState(null)
    const [mintEndTime, setmintEndTime] = useState(null)
    const [mintPrice, setmintPrice] = useState(null)
    const [baseURI, setbaseURI] = useState("")

    const [addressOfDeployedContract, setAddress] = useState("")



    const [account, setAccount] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkWalletConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Install Metamask')
      return
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('Found Account, ', account)
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      let network = await provider.getNetwork()
      setAccount(account)
      if (network.name !== 'maticmum') {
        console.log('Wrong network')
      } else {
        console.log('maticmum connected')
      }
    } else {
      console.log('Create a Ethereum Account')
    }
  }

  const login = async () => {
    try {
      checkWalletConnected();
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Install Metamask')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected, ', accounts[0])
      setAccount(accounts[0])
      setIsAuthenticated(true)
    } catch (e) {
      console.log(e)
    }
  }

  // useEffect(checkWalletConnected, [])
  // useEffect(login, []) //local storage

  useEffect(() => {
    console.log(account)
  }, [account])

  async function createCollection() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = await provider.getSigner();
    let erc721 = new ethers.ContractFactory(ERC721.abi, ERC721.bytecode, signer);
    // let txn = await erc721.deploy("ERC721R", "R-C", 5000, 1, 1645518868, 1645519008, 100000000000000, "ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/");
    let price = ethers.utils.parseEther(mintPrice.toString());
    let txn = await erc721.deploy(name, symbol, collectionSize, maxMintPerAddress, mintStartTime, mintEndTime, mintPrice, "ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/");
    // let receipt = await txn.wait();
    console.log("txn ",txn)
    console.log("txn ",txn.address)
    setAddress(txn.address);
    // console.log("receipt", receipt)
  }

  return (
    <div className="home">
     
      <Head>
        <title>ERC721R Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <nav className="flex justify-around p-6 text-xl	">
      <h1>ERC721R</h1>
      <button
        onClick={login}
        className=" cursor-pointer bg-yellow-100  p-2 text-gray-800"
      >
        {account
          ? `${account.slice(0, 4)} ... ${account.slice(
              account.length - 3,
              account.length
            )}`
          : 'Connect to Wallet'}
      </button>
    </nav>

    
      <main className=" flex w-full flex-col text-black items-center justify-center">

       <input type="text" value={name} placeholder='collection name'  onChange={(e)=> setname(e.currentTarget.value)} />
       <input type="text" value={symbol} placeholder='collection Symbol' onChange={(e)=> setsymbol(e.currentTarget.value)}/>
       <input type="number" value={collectionSize} placeholder='collection Size' onChange={(e)=> setcollectionSize(e.currentTarget.value)}/>
       <input type="number" value={maxMintPerAddress} placeholder='Max mint per address' onChange={(e)=> setmaxMintPerAddress(e.currentTarget.value)}/>
       <input type="number" value={mintStartTime} placeholder='Start time' onChange={(e)=> setmintStartTime(e.currentTarget.value)}/>
       <input type="number" value={mintEndTime} placeholder='end time' onChange={(e)=> setmintEndTime(e.currentTarget.value)}/>
       <input type="number" value={mintPrice} placeholder='price in Matic' onChange={(e)=> setmintPrice(e.currentTarget.value)}/>
       <input type="text" value={baseURI} placeholder='baseURI' onChange={(e)=> setbaseURI(e.currentTarget.value)}/> 
       {/* ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/ */}
        <h2>{addressOfDeployedContract}</h2>

        <h3>make sure to save the arguments somewhere if you want to verify your collection contract</h3>
        <div className="flex p-5 "> 
            <button onClick={createCollection} className="m-5 cursor-pointer  rounded border bg-gradient-to-r from-pink-500/70 to-yellow-500/50 py-2 px-4 font-semibold text-white shadow-lg shadow-red-500 hover:shadow-md hover:shadow-yellow-300/50">
              Mint
            </button>

        </div>
      </main>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </div>
  )
}

export default Home

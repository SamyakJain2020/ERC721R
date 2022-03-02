// import  { NextPage } from 'next'
import Head from 'next/head'
// import Link from 'next/link'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import ERC721 from '../assets/ERC721R.json'
import { createTheme } from '@mui/material/styles'
// import exec from 'child_process'
const Home = () => {
  const [name, setname] = useState('')
  const [symbol, setsymbol] = useState('')
  const [collectionSize, setcollectionSize] = useState(null)
  const [maxMintPerAddress, setmaxMintPerAddress] = useState(null)
  const [mintStartTime, setmintStartTime] = useState(null)
  const [mintEndTime, setmintEndTime] = useState(null)
  const [mintPrice, setmintPrice] = useState(null)
  const [baseURI, setbaseURI] = useState('')

  const [addressOfDeployedContract, setAddress] = useState('')

  const [account, setAccount] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkWalletConnected = async () => {
    const { ethereum } = window

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
  // const theme = createTheme({

  //     palette: {
  //       primary: deepOrange,
  //       secondary: yellow,
  //     },

  // })

  const login = async () => {
    try {
      checkWalletConnected()
      const { ethereum } = window

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

  useEffect(checkWalletConnected, [])
  useEffect(login, []) //local storage

  useEffect(() => {
    console.log(account)
  }, [account])

  async function createCollection() {
    setIsLoading(true)
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = await provider.getSigner()
    let erc721 = new ethers.ContractFactory(ERC721.abi, ERC721.bytecode, signer)
    // let txn = await erc721.deploy("ERC721R", "R-C", 5000, 1, 1645518868, 1645519008, 100000000000000, "ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/");
    try {
      let price = ethers.utils.parseEther(mintPrice.toString())
      console.log(name)
      console.log(symbol)
      console.log(collectionSize)
      console.log(maxMintPerAddress)
      console.log(mintStartTime)
      console.log(mintEndTime)
      console.log(price)
      console.log(baseURI)

      let txn = await erc721.deploy(
        name,
        symbol,
        collectionSize,
        maxMintPerAddress,
        mintStartTime,
        mintEndTime,
        price,
        'ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/'
      )
      // let receipt = await txn.wait();
      await txn.deployed()

      console.log('txn ', txn)
      console.log('txn ', txn.address)
      setAddress(txn.address)
      setIsLoading(false)
      // console.log("receipt", receipt)
    } catch (error) {
      setError(error)
    }
  }

  // function getFile() {
  //   var json_string = JSON.stringify(
  //     { ans: 'hio my name is samyak' },
  //     undefined,
  //     2
  //   )
  //   var link = document.createElement('a')
  //   link.download = 'MyNFT.sol'
  //   var blob = new Blob([json_string], { type: 'text/plain' })
  //   link.href = window.URL.createObjectURL(blob)
  //   link.click()
  // }

  // function verifyContract() {
  //   let price = ethers.utils.parseEther(mintPrice.toString())
  //     console.log(name)
  //     console.log(symbol)
  //     console.log(collectionSize)
  //     console.log(maxMintPerAddress)
  //     console.log(mintStartTime)
  //     console.log(mintEndTime)
  //     console.log(price)
  //     console.log(baseURI)
  //   exec(
  //     `npx hardhat verify --network polygon ${addressOfDeployedContract} ${name} ${symbol} ${collectionSize} ${maxMintPerAddress} ${mintStartTime} ${mintEndTime} ${price} ${'ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/'} `,
  //     function (error, stdout, stderr) {
  //       console.log('stdout: ' + stdout)
  //       console.log('stderr: ' + stderr)
  //       if (error !== null) {
  //         console.log('exec error: ' + error)
  //       }
  //     }
  //   )
  // }
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

      <main className=" flex w-full flex-col items-center justify-center gap-4 text-white ">
        <TextField
          required
          id="standard-required"
          label="collection name"
          defaultValue="Hello World"
          variant="standard"
          value={name}
          onChange={(e) => setname(e.currentTarget.value)}
          colour="secondary"
        />
        <TextField
          required
          id="standard-required"
          label="collection Symbol"
          defaultValue="Hello World"
          variant="standard"
          value={symbol}
          placeholder=""
          onChange={(e) => setsymbol(e.currentTarget.value)}
        />
        <TextField
          required
          id="standard-required"
          label="baseURI"
          defaultValue="Hello World"
          variant="standard"
          value={baseURI}
          placeholder=""
          onChange={(e) => setbaseURI(e.currentTarget.value)}
        />

        <TextField
          id="standard-number"
          label="collection Size"
          type="number"
          value={collectionSize}
          onChange={(e) => setcollectionSize(e.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Max mint per address"
          type="number"
          value={maxMintPerAddress}
          placeholder=""
          onChange={(e) => setmaxMintPerAddress(e.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Start time"
          type="number"
          value={mintStartTime}
          placeholder=""
          onChange={(e) => setmintStartTime(e.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="end time"
          type="number"
          value={mintEndTime}
          placeholder=""
          onChange={(e) => setmintEndTime(e.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="price in Matic"
          type="number"
          value={mintPrice}
          placeholder=""
          onChange={(e) => setmintPrice(e.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />

        {/* ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/ */}

        <div className="flex p-5 ">
          <button
            onClick={createCollection}
            className="m-5 cursor-pointer  rounded border bg-gradient-to-r from-pink-500/70 to-yellow-500/50 py-2 px-4 font-semibold text-white shadow-lg shadow-red-500 hover:shadow-md hover:shadow-yellow-300/50"
          >
            Mint
          </button>
        </div>
      </main>
      {error && (
        <p className="bg-red-700 text-center font-medium text-white opacity-60 ">
          TRANSACTION FAILED: {error.message}
        </p>
      )}

      {isLoading && (
        <div className="flex items-center justify-center">loading....</div>
      )}
      {!error && addressOfDeployedContract && (
        <div>
          {' '}
          <h2>Contract Address: {addressOfDeployedContract}</h2>
          <a
            href={`https://mumbai.polygonscan.com/address/{addressOfDeployedContract}`}
            target="_blank"
          >
            `https://mumbai.polygonscan.com/address/${addressOfDeployedContract}
            `
          </a>{' '}
          <h3>Steps You need To perform now.</h3>
          <ol>
            <li>
              Verify your Contract collection address and click on the button
              <a
                href={`https://mumbai.polygonscan.com/verifyContract?a=${addressOfDeployedContract}`}
                target="_black"
              />
            </li>
          </ol>
        </div>
      )}
      {/* <div>
        {' '}
        <button className="m-4 bg-orange-500 p-4 text-xl" onClick={getFile}>
          {' '}
          GET MY FILE
        </button>
      </div> */}

      {/* <div>
        {' '}
        <button
          className="m-4 bg-orange-500 p-4 text-xl"
          onClick={verifyContract}
        >
          {' '}
          VERIFY CONTRACT
        </button>
      </div> */}
    </div>
  )
}

export default Home

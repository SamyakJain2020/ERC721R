import React, { useState, useEffect } from 'react'

import { ethers, providers } from 'ethers'

const Navbar = ({}) => {
  const [account, setAccount] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

  const login = async () => {
    try {
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
  return (
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
  )
}
export async function getStaticProps({ params }) {
  return { props: { post } }
}
export default Navbar

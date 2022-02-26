import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Svg from '../assets/Group13.svg'
import Image from 'next/image'
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="p-6 text-xl	">
        <h1>ERC721R</h1>
      </nav>
      <main className=" flex w-full flex-col items-center justify-center">
        <div className="m-auto w-4/5 mb-5 p-5">
          <Image src={Svg} width="2000" height="" />
        </div>

        <h1 className="text-6xl font-bold">
          ERC721R, a new way of launching NFT collections
        </h1>
        <p className="m-10 text-xl">
          ERC721R is a sprint NFT launcher contract through which you can launch
          your own NFT collection, but not norm
        </p>
        <div className="flex p-5 ">
          <Link href="/">
            <button className="m-5 rounded  border bg-gradient-to-r from-pink-500/70 to-yellow-500/50 py-2 px-4 font-semibold text-white shadow-lg shadow-red-500 hover:shadow-md hover:shadow-yellow-300/50 cursor-pointer">
              Get Started
            </button>
          </Link>
          <Link href="/">
            <button className="m-5 rounded bg-transparent py-2 px-4 cursor-pointer font-semibold text-gray-800">
              <p className="para bg-blend-darken ">
                Explore
              </p>
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home

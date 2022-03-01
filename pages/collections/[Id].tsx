import NFT from '../../components/Card'
import Navbar from '../../components/Navbar'
const Dashboard = ({
  tokens = [
    {
      type: 'image',
      conentURI:
        'https://cdn.pixabay.com/photo/2017/08/30/01/05/nasa-2695569_960_720.jpg',
      name: 'NFT1',
      description: 'NFT1 description',
      id: 1,
      price: 1,
      owner: '0x0',
      meta: {
        name: 'NFT1',
        description: 'NFT1 description',
        id: 1,
      },
    },
    {
      type: 'image',
      conentURI:
        'https://cdn.pixabay.com/photo/2017/08/30/01/05/nasa-2695569_960_720.jpg',
      name: 'NFT1',
      description: 'NFT1 description',
      id: 1,
      price: 1,
      owner: '0x0',
      meta: {
        name: 'NFT1',
        description: 'NFT1 description',
        id: 1,
      },
    },
  ],

}) => {
  return (
    <div>
      <Navbar/>
        
      <div className=" mx-auto max-w-lg px-6 sm:max-w-2xl sm:px-4 md:max-w-full md:px-8 lg:max-w-screen-2xl lg:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
          {tokens.map((token: any) => {
            console.log(token.type)
            return token.type !== 'image' ? null : (
              <div
                key={token.contentURI}
                style={{
                  padding: '20px 0px',
                }}
              >
                <NFT
                  key={token.contentURI}
                  title={token.meta.name}
                  description={token.meta.description}
                  children={token.contentURI}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

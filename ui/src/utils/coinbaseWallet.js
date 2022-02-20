
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
      
// const APP_NAME = 'NuCarbit'
// const APP_LOGO_URL = 'https://example.com/logo.png'
// const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/cb4a57a894e640418e2291ad418127a7'
// const DEFAULT_CHAIN_ID = 4

// // Initialize WalletLink
// const walletLink = new WalletLink({
//   appName: APP_NAME,
//   appLogoUrl: APP_LOGO_URL,
//   darkMode: false
// })

// // Initialize a Web3 Provider object
// export const ethereum = walletLink.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

// // Initialize a Web3 object
// export const web3 = new Web3(ethereum)

const providerOptions = {
  walletlink: {
    package: WalletLink, // Required
    options: {
      appName: "Nucarbit", // Required
      infuraId: "a40f9cbe88ee4758ab51b0682175e7b8", // Required unless you provide a JSON RPC url; see `rpc` below
      // rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  }
}

export const web3Modal = new Web3Modal({
  network: 'rinkeby',
  cacheProvider: true,
  providerOptions
})

export const provider = web3Modal.connect()

export const web3 = new Web3(provider)

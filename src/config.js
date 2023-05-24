import Token from './ABI/ERC20Token.json';
import Dao from './ABI/Dao.json';
export const baseURL = 'http://13.215.148.86:8999/'
export const contractAddress = {
    //测试
    // "USDT": "0x3D7995A37EB34617F6312F7E9BdF2B0e24d5051e",
    "ARB": "0xFB217e6f2E91dff262f9a36C8cD93Af9d1e120c6",
    "Dao": "0x4631D0e3d3F46a51043e828a46E5535d88de4C49",
    //正式
    // "USDT": "0x3D7995A37EB34617F6312F7E9BdF2B0e24d5051e",
    // "ARB": "0x92D6C1e31e14520e676a687F0a93788B716BEff5",
    // "Dao": "0xfD475d4C2d98ef40F02ECCCb7Fe89Ec2287Fd74E",
}
export const ABI  = {
    // "USDT": Token,
    "ARB": Token,
    "Dao": Dao,
}
export const TokenConfig = {
    USDT:{
        decimals:6
    },
    ARB:{
        decimals:18
    }
}
export const chainConfig = {
    chainId: '0x66eed',
    chainName: 'Arbitrum Goerli',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://endpoints.omniatech.io/v1/arbitrum/goerli/public'],
    blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io'],
}
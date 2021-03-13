import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
    {
    pid: 0,
    risk: 2,
    lpSymbol: 'MANGO-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xE5fE53149A278aF40ACb04334c4140eE7444BE4B',
    },
    tokenSymbol: 'MANGO',
    tokenAddresses: {
      97: '',
      56: '0x3D29cdB00CB183a0aEcEEa4fB73F55E1450af3d4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

   {
    pid: 1,
    risk: 2,
    lpSymbol: 'MANGO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xB0361a92E2646F9F11f1670484f09D585fe4a419',
    },
    tokenSymbol: 'MANGO',
    tokenAddresses: {
      97: '',
      56: '0x3D29cdB00CB183a0aEcEEa4fB73F55E1450af3d4',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

   {
    pid: 2,
    risk: 1,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xF455f6f7988B752F75488E2CCcC030346d0Cac72',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
   pid: 4,
   risk: 3,
   lpSymbol: 'MANGO-CHS LP',
   lpAddresses: {
     97: '',
     56: '0xF63c29444fdE98d8227088Cd4AEb48E33B6b0000',
   },
   tokenSymbol: 'MANGO',
   tokenAddresses: {
     97: '',
     56: '0x3D29cdB00CB183a0aEcEEa4fB73F55E1450af3d4',
   },
   quoteTokenSymbol: QuoteToken.CHS,
   quoteTokenAdresses: contracts.chs,
 },

 {
  pid: 5,
  risk: 3,
  lpSymbol: 'MANGO-PIZZA LP',
  lpAddresses: {
    97: '',
    56: '0x80bEC1095372cE1A01e3ACd2A5B5eC3140DdFA20',
  },
  tokenSymbol: 'MANGO',
  tokenAddresses: {
    97: '',
    56: '0x3D29cdB00CB183a0aEcEEa4fB73F55E1450af3d4',
  },
  quoteTokenSymbol: QuoteToken.PIZZA,
  quoteTokenAdresses: contracts.pizza,
},
/**
  {
    pid: 3,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'MANGO',
    lpAddresses: {
      97: '',
      56: '0x3D29cdB00CB183a0aEcEEa4fB73F55E1450af3d4',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  } * */
]

export default farms

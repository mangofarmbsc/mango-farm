import { MenuEntry } from '@mangofarm/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Swap',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Swap',
        href: 'https://cheeseswap.app/#/swap?inputCurrency=0x3d29cdb00cb183a0aeceea4fb73f55e1450af3d4&outputCurrency=0xadd8a06fd58761a5047426e160b2b88ad3b9d464',
      },
      {
        label: 'Liquidity',
        href: 'https://cheeseswap.app/#/add/ETH/0x3d29cdb00cb183a0aeceea4fb73f55e1450af3d4',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  // {
  //   label: 'Mango',
  //   icon: 'PoolIcon',
  //   href: '/mango',
  // },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.cheeseswap.app/',
      },
      {
        label: 'Tokens',
        href: 'https://info.cheeseswap.app/token/0x3d29cdb00cb183a0aeceea4fb73f55e1450af3d4',
      },
      {
        label: 'Pairs',
        href: 'https://info.cheeseswap.app/pair/0xB0361a92E2646F9F11f1670484f09D585fe4a419',
      },
      {
        label: 'Accounts',
        href: 'https://info.cheeseswap.app/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/mangofarmbsc/',
      },
    ],
  },
]

export default config

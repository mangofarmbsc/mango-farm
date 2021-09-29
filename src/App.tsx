import React, { Suspense, useEffect, lazy } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@mangofarm/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'
import Pools from './views/Pools'
import Home from './views/Home'
import Farms from './views/Farms'


const NotFound = lazy(() => import('./views/NotFound'))


// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Suspense fallback={null}>
   <HashRouter>

    <ResetCSS />
    <GlobalStyle />
    <Menu>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/mango">
              <Farms tokenMode />
            </Route>
            <Route component={NotFound} />
            </Switch>
           </Suspense>
         </Menu>
      </HashRouter>
       </Suspense>
  )
}

export default React.memo(App)

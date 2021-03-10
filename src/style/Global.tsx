import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { MangoTheme } from '@mangofarm/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends MangoTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Source Sans Pro', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle

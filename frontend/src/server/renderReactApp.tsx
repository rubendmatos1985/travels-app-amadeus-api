import * as ReactDOM from 'react-dom/server'
import * as Redux from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { mainReducer } from 'common/redux/reducers/mainReducer'
import { Request } from 'express'
import * as React from 'react'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import { ThemeProvider, ServerStyleSheets } from '@material-ui/styles'
import theme from 'common/theme'
import App from 'common/App'
import 'isomorphic-fetch'
import { routes, SSRRoute } from 'common/routes/routes'

export const renderReactApp = async (req: Request) => {
  let fetchedData = {}
  const currentRoute: SSRRoute | undefined = routes.find(
    (route: SSRRoute) => matchPath(req.url, route) !== null
  )

  if (currentRoute && currentRoute.needsFetchData) {
    fetchedData = await currentRoute.fetchData().then(v => v.json())
  }
  const sheets = new ServerStyleSheets()
  const store = Redux.createStore(mainReducer, {
    changeTitle: '',
    ...fetchedData
  } as any)

  const appHtml = ReactDOM.renderToString(
    sheets.collect(
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router location={req.path} context={{}}>
            <App />
          </Router>
        </ThemeProvider>
      </ReduxProvider>
    )
  )
  const appInitialState = JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c'
  )
  const appCSS = sheets.toString()

  return `
           <!DOCTYPE html>
          <html>
              <head>
                  <title>TypeScript ReactJS SSR App</title>
                  <style>
                      body {
                          margin: 0px;
                          padding: 0px;
                      }
                  </style>
                  <style id="jss-server-side">${appCSS}</style>
              </head>
              <body>
                  <main id="root">${appHtml}</main>
                  <script>
                      window["__PRELOADED_STATE__"] = ${appInitialState}
                      if(window !== undefined){
                        let jss = document.getElementById('jss-server-side');
                        jss.parentNode.removeChild(jss);
                      }
                  </script>
                  <script type="application/javascript" src="bundle.js"></script>
              </body>
          </html>
      `
}

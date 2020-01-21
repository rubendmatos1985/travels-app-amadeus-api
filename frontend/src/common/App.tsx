import * as React from 'react'
import { Route } from 'react-router-dom'
import AppBar from 'common/containers/AppBar/AppBar.component'
import { routes, SSRRoute } from './routes/routes'
import AppContainer from './components/AppContainer'

const App = (props: any) => {
  return (
    <React.Fragment>
      <AppBar />
      <AppContainer>
        {routes.map((route: SSRRoute, i) => {
          const Component: (props: any) => React.ReactElement<any> =
            route.component

          return (
            <Route exact={route.exact} path={route.path} key={i}>
              <Component />
            </Route>
          )
        })}
      </AppContainer>
    </React.Fragment>
  )
}

export default App

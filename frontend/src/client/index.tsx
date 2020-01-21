import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Redux from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from 'common/App'
import theme from 'common/theme'
import { changeTitle } from 'common/redux/reducers/title'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
const preloadedState = (window as any)['__PRELOADED_STATE__']
delete (window as any)['__PRELOADED_STATE__']

const store = Redux.createStore(
  changeTitle,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
)

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  )
}
ReactDOM.hydrate(<Main />, document.getElementById('root'))

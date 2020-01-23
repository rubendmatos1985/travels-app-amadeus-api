import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Redux from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from 'common/App'
import theme from 'common/theme'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { mainReducer } from 'common/redux/reducers/mainReducer'
const preloadedState = (window as any)['__PRELOADED_STATE__']
delete (window as any)['__PRELOADED_STATE__']
const store = Redux.createStore(
  mainReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
)

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    const script = document.querySelector('#temp_script')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    if (script) {
      script.remove()
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

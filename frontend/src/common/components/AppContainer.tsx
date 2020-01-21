import * as React from 'react'
import { withStyles, createStyles, Theme } from '@material-ui/core'
import { Switch } from 'react-router-dom'

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: '1vw',
      width: '100%'
    }
  })

const AppContainer = (props: any) => (
  <main className={props.classes.container}>
    <Switch>{props.children}</Switch>
  </main>
)

export default withStyles(styles)(AppContainer)

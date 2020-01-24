import * as React from 'react'
import SearchPannel from '../containers/SearchPannel/index'
import { createStyles, Theme, withStyles } from '@material-ui/core'

interface HomeProps {
  classes: any
}
const styles = (theme: Theme) =>
  createStyles({
    homeContainer: {
      width: '100%',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

function Home(props: HomeProps) {
  return (
    <main className={props.classes.homeContainer}>
      <SearchPannel />
    </main>
  )
}

export default withStyles(styles)(Home)

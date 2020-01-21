import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from 'common/redux/store'
import { changeTitle } from 'common/redux/action'
import SearchPannel from '../containers/SearchPannel/index'

interface HomeProps {
  title: string
  updateTitle: any
  fetchRecomendations: any
  recomendations: any
}

function Home(props: HomeProps) {
  return (
    <React.Fragment>
      <SearchPannel />
    </React.Fragment>
  )
}

const mapStateToProps = (state: Store) => {
  return {
    title: state.title,
    recomendations: state.recommendations
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  updateTitle: (title: string) => dispatch(changeTitle(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

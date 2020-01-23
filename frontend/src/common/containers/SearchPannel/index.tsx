import React, { ChangeEvent, Fragment } from 'react'
import { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  Paper,
  TextField,
  withStyles,
  createStyles,
  Theme,
  InputAdornment,
  Button,
  Grid
} from '@material-ui/core'
import moment from 'moment'
import DatePicker from 'common/components/SearchPanelComponents/DatePicker'
import PassengersAmountSelector from '../../components/SearchPanelComponents/PassengersAmountSelector'
import { compose } from 'redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { connect } from 'react-redux'
import { Store } from 'common/redux/store'
import { getAutoCompletition } from 'common/redux/action'
import { ReduxAction } from 'common/redux/reducers/home'
import { ThunkDispatch } from 'redux-thunk'
import { searchPanelStyles as styles } from './styles'
import SearchCityTextField, {
  FlightPoint,
  emptySuggestionList
} from 'common/components/SearchPanelComponents/SearchCityTextField'

interface IProps {
  autocompletition: any
  autocomplete: (input: string) => Promise<any>
  classes: any
}

function SearchPannel(props: IProps) {
  const [departDate, setDepartDate] = useState(
    moment(new Date()).format('DDD/MMM/YYYY')
  )
  const [returnDate, setReturnDate] = useState(
    moment(departDate)
      .add(7, 'days')
      .format('DDD/MMM/YYYY')
  )

  const handleOnChangeDepartDate = (date: string) => {
    setDepartDate(date)
  }

  const handleOnChangeReturnDate = (date: string) => {
    setReturnDate(date)
  }

  const handleOriginInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.autocomplete(e.target.value)
  }

  const handleDestinationInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.autocomplete(e.target.value)
  }

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper className={props.classes.paper}>
          <div className={props.classes.searchPanelContainer}>
            <div className={props.classes.searchCitiesContainer}>
              <SearchCityTextField
                flightPoint={FlightPoint.From}
                onChange={handleOriginInput}
                suggestionList={
                  props.autocompletition
                    ? props.autocompletition.data
                    : emptySuggestionList
                }
              />
              <SearchCityTextField
                flightPoint={FlightPoint.To}
                onChange={handleDestinationInput}
                suggestionList={
                  props.autocompletition
                    ? props.autocompletition.data
                    : emptySuggestionList
                }
              />
            </div>
            <div className={props.classes.searchDateContainer}>
              <DatePicker
                label="Depart"
                date={departDate}
                onChange={handleOnChangeDepartDate}
              />
              <DatePicker
                label="Return"
                date={returnDate}
                onChange={handleOnChangeReturnDate}
              />
            </div>
            <div className={props.classes.searchPassengersContainer}>
              <PassengersAmountSelector />
            </div>
            <div className={props.classes.searchButtonContainer}>
              <Button
                className={props.classes.searchButton}
                variant="contained"
                color="secondary"
                style={{ width: 100 }}
              >
                Search
              </Button>
            </div>
          </div>
        </Paper>
      </MuiPickersUtilsProvider>
    </Fragment>
  )
}

const mapStateToProps = (store: Store) => ({
  autocompletition: store.home.autocompletition
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<Store, null, ReduxAction>
) => ({
  autocomplete: (input: string) => dispatch(getAutoCompletition(input))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SearchPannel)

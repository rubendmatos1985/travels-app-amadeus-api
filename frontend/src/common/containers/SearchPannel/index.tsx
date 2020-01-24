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
import moment, { Moment } from 'moment'
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
  emptySuggestionList,
  ISelectedPlaceData
} from 'common/components/SearchPanelComponents/SearchCityTextField'

interface IProps {
  autocompletition: any
  autocomplete: (input: string) => Promise<any>
  classes: any
}

function SearchPannel(props: IProps) {
  const [departDate, setDepartDate] = useState<Moment>(moment())
  const [returnDate, setReturnDate] = useState<Moment>(
    moment(departDate).add(7, 'days')
  )
  const [originPlace, setOriginPlace] = useState<ISelectedPlaceData>(
    {} as ISelectedPlaceData
  )
  const [destinationPlace, setDestinationPlace] = useState<ISelectedPlaceData>(
    {} as ISelectedPlaceData
  )

  const handleDepartDate = (date: Moment) => {
    setDepartDate(date)
  }

  const handleReturnDate = (date: Moment) => {
    setReturnDate(date)
  }

  const handleOnChangeOriginInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.autocomplete(e.target.value)
  }

  const handleOnChangeDestinationInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.autocomplete(e.target.value)
  }

  const handleSelectOriginInput = (data: ISelectedPlaceData) => {
    setOriginPlace(data)
  }

  const handleSelectDestinationInput = (data: ISelectedPlaceData) => {
    setDestinationPlace(data)
  }

  const handleSearchFlightOffers = (e: React.MouseEvent) => {}

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper className={props.classes.paper}>
          <div className={props.classes.searchPanelContainer}>
            <div className={props.classes.searchCitiesContainer}>
              <SearchCityTextField
                flightPoint={FlightPoint.From}
                onChange={handleOnChangeOriginInput}
                onSelect={handleSelectOriginInput}
                suggestionList={
                  props.autocompletition
                    ? props.autocompletition.data
                    : emptySuggestionList
                }
              />
              <SearchCityTextField
                flightPoint={FlightPoint.To}
                onChange={handleOnChangeDestinationInput}
                onSelect={handleSelectDestinationInput}
                suggestionList={
                  props.autocompletition
                    ? props.autocompletition.data
                    : emptySuggestionList
                }
              />
            </div>
            <div className={props.classes.searchDateContainer}>
              <DatePicker
                disablePast
                label="Depart"
                date={departDate.format('DD/MM/YYYY')}
                onChange={handleDepartDate}
              />
              <DatePicker
                minDate={departDate.clone().add(1, 'day')}
                label="Return"
                date={returnDate.format('DD/MM/YYYY')}
                onChange={handleReturnDate}
              />
            </div>
            <div className={props.classes.searchPassengersContainer}>
              <PassengersAmountSelector />
            </div>
            <div className={props.classes.searchButtonContainer}>
              <Button
                onClick={handleSearchFlightOffers}
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

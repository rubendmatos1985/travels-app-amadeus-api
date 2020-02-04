import React, { ChangeEvent, Fragment } from 'react';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Paper, createStyles, Theme, Button, withStyles } from '@material-ui/core';
import moment, { Moment } from 'moment';
import DatePicker from '../../components/SearchPanelComponents/DatePicker';
import PassengersAmountSelector from '../../components/SearchPanelComponents/PassengersAmountSelector';
import { compose } from 'redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { connect } from 'react-redux';
import { Store } from '../../redux/store';
import { getAutoCompletition } from '../../redux/action';
import { ReduxAction } from '../../redux/reducers/home';
import { ThunkDispatch } from 'redux-thunk';
import { searchPanelStyles as styles } from './styles';
import SearchCityTextField, {
  FlightPoint,
  emptySuggestionList,
  ISelectedPlaceData
} from '../../components/SearchPanelComponents/SearchCityTextField';

interface IProps {
  autocompletition: any;
  autocomplete: (input: string) => Promise<any>;
  classes: any;
}

function SearchPannel(props: IProps) {
  const [departDate, setDepartDate] = useState<Moment>(moment());
  const [returnDate, setReturnDate] = useState<Moment>(
    moment(departDate)
      .clone()
      .add(7, 'days')
  );
  const [originPlace, setOriginPlace] = useState<ISelectedPlaceData>({} as ISelectedPlaceData);
  const [destinationPlace, setDestinationPlace] = useState<ISelectedPlaceData>(
    {} as ISelectedPlaceData
  );

  const handleDepartDate = (date: Moment) => {
    setDepartDate(date);
  };

  const handleReturnDate = (date: Moment) => {
    setReturnDate(date);
  };

  const handleOnChangeOriginInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.autocomplete(e.target.value);
  };

  const handleOnChangeDestinationInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.autocomplete(e.target.value);
  };

  const handleSelectOriginInput = (data: ISelectedPlaceData) => {
    setOriginPlace(data);
  };

  const handleSelectDestinationInput = (data: ISelectedPlaceData) => {
    setDestinationPlace(data);
  };

  const handleSearchFlightOffers = (e: React.MouseEvent) => {};

  const getSuggestionsForOriginInput = () =>
    props.autocompletition
      ? props.autocompletition.data.filter(
          (d: { name: string; iataCode: string }) =>
            d.name !== destinationPlace.name && d.iataCode !== destinationPlace.iata
        )
      : emptySuggestionList;

  const getSuggestionsForDestinationInput = () =>
    props.autocompletition
      ? props.autocompletition.data.filter(
          (d: { name: string; iataCode: string }) =>
            d.name !== originPlace.name && d.iataCode !== originPlace.iata
        )
      : emptySuggestionList;

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper className={props.classes.paper}>
          <div className={props.classes.searchPanelContainer}>
            <div className={props.classes.searchCitiesContainer}>
              <SearchCityTextField
                id="origin-input"
                flightPoint={FlightPoint.From}
                onChange={handleOnChangeOriginInput}
                onSelect={handleSelectOriginInput}
                suggestionList={getSuggestionsForOriginInput()}
              />
              <SearchCityTextField
                id="destination-input"
                flightPoint={FlightPoint.To}
                onChange={handleOnChangeDestinationInput}
                onSelect={handleSelectDestinationInput}
                suggestionList={getSuggestionsForDestinationInput()}
              />
            </div>
            <div className={props.classes.searchDateContainer}>
              <DatePicker
                maxDate={moment().add(1, 'year')}
                disablePast={true}
                label="Depart"
                date={departDate}
                onChange={handleDepartDate}
              />
              <DatePicker
                minDate={departDate.clone().add(1, 'day')}
                maxDate={departDate.clone().add(2, 'week')}
                label="Return"
                date={returnDate}
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
  );
}

const mapStateToProps = (store: Store) => ({
  autocompletition: store.home.autocompletition
});

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, ReduxAction>) => ({
  autocomplete: (input: string) => dispatch(getAutoCompletition(input))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SearchPannel);

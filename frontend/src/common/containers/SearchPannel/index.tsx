import React from 'react'
import { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  Paper,
  TextField,
  withStyles,
  createStyles,
  Theme,
  InputAdornment
} from '@material-ui/core'
import { FlightTakeoff, FlightLand, PeopleAlt } from '@material-ui/icons'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { StyleRules } from '@material-ui/core/styles'
import moment from 'moment'
import DatePicker from 'common/components/SearchPanelComponents/DatePicker'

const styles: (theme: Theme) => StyleRules = (theme: Theme) =>
  createStyles({
    [theme.breakpoints.down('sm')]: {
      paper: {
        flexDirection: 'column',
        '& div': { width: '100%' }
      }
    },
    icons: {
      [theme.breakpoints.down('sm')]: { marginLeft: 'calc(100% - 100px)' }
    },
    container: {
      width: '100%',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    paper: {
      padding: theme.spacing(1),
      width: '100%',
      minWidth: 300,
      display: 'flex',
      maxWidth: 1000
    },
    datePickerContainer: {
      '& div': {
        padding: 0,
        margin: 0
      },
      width: '40%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: theme.spacing(1)
    },
    inputsContainer: {
      width: '40%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1)
    },
    citiesInputs: {
      marginLeft: theme.spacing(0.5)
    },
    personsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(0.5)
    }
  })

function SearchPannel(props: any) {
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

  return (
    <div className={props.classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper className={props.classes.paper}>
          <div className={props.classes.inputsContainer}>
            <TextField
              className={props.classes.citiesInputs}
              id="standard-search"
              label="From"
              type="search"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={props.classes.icons}
                  >
                    <FlightTakeoff />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              className={props.classes.citiesInputs}
              id="standard-search1"
              label="To"
              type="search"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={props.classes.icons}
                  >
                    <FlightLand />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className={props.classes.datePickerContainer}>
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
          <div className={props.classes.personsContainer}>
            <TextField
              variant="outlined"
              label="Passengers"
              defaultValue={1}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={props.classes.icons}
                  >
                    <PeopleAlt />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </Paper>
      </MuiPickersUtilsProvider>
    </div>
  )
}
export default withStyles(styles)(SearchPannel)

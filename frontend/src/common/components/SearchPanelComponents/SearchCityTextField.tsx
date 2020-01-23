import React, { ChangeEvent, Fragment, useRef, useState } from 'react'
import {
  TextField,
  InputAdornment,
  withStyles,
  createStyles,
  Theme,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Popover,
  Menu,
  ListItem
} from '@material-ui/core'
import { FlightLand, FlightTakeoff, GpsFixedTwoTone } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
export enum FlightPoint {
  From = 'From',
  To = 'To'
}

interface IProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  classes: any
  flightPoint: FlightPoint
  suggestionList: SuggestionsListItem[]
}

export interface SuggestionsListItem {
  type: string
  subType: string
  name: string
  detailedName: string
  id: string
  self: any
  iataCode: string
  address: any
}

export const emptySuggestionList: SuggestionsListItem[] = [
  {
    type: '',
    subType: '',
    name: '',
    detailedName: '',
    id: '',
    self: {},
    iataCode: '',
    address: ''
  }
]

const styles = (theme: Theme) =>
  createStyles({
    cityInputContainer: {
      minWidth: '200px',
      marginLeft: theme.spacing(0.2)
    },
    citiesInputs: {
      '& div': {
        paddingRight: '0 !important'
      },
      width: '100% !important'
    }
  })

function SearchCityTextField(props: IProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const handleCloseMenu = (e: React.MouseEvent<Document, MouseEvent>) =>
    setMenuIsOpen(false)

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void =>
    !menuIsOpen && setMenuIsOpen(true)

  return (
    <Fragment>
      <Autocomplete
        className={props.classes.cityInputContainer}
        freeSolo
        options={props.suggestionList}
        autoHighlight
        getOptionLabel={(o: SuggestionsListItem) => `${o.name}, ${o.iataCode}`}
        renderOption={(o: SuggestionsListItem) => (
          <ListItemText>{`${o.name} ${o.iataCode}`}</ListItemText>
        )}
        renderInput={(params: any) => (
          <TextField
            className={props.classes.citiesInputs}
            onChange={props.onChange}
            {...params}
            label={props.flightPoint}
            variant="outlined"
            inputProps={...params.inputProps}
          />
        )}
      />
    </Fragment>
  )
}
export default withStyles(styles)(SearchCityTextField)
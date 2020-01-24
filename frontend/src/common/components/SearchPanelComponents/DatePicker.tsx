import React, { useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import {
  TextField,
  InputAdornment,
  withStyles,
  createStyles,
  Theme,
  StyleRules
} from '@material-ui/core'
import { DateRange } from '@material-ui/icons'
import moment, { Moment } from 'moment'

interface IProps {
  disablePast?: boolean
  minDate?: Moment
  maxDate?: Moment
  date: string
  onClose?: () => void
  onChange: (date: Moment) => void
  onClick?: () => void
  label: string
  classes: any
}

const styles = (theme: Theme): StyleRules =>
  createStyles({
    textField: {
      '& div': {
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between'
      },
      '& label': {
        zIndex: 'unset'
      },
      width: '150px',
      '& *': {
        cursor: 'pointer !important'
      },
      marginLeft: theme.spacing(0.2)
    },
    icons: {
      '& svg': { marginLeft: 'calc(100% - 50px)' }
    }
  })

function DatePicker(props: IProps) {
  const [pickerIsOpen, setPickerIsOpen] = useState(false)

  const handleOnClose = () => {
    setPickerIsOpen(false)
    if (props.onClose) {
      props.onClose()
    }
  }

  const handleOnClick = () => {
    setPickerIsOpen(true)
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <KeyboardDatePicker
      minDate={props.minDate ? props.minDate.toDate() : new Date()}
      maxDate={props.maxDate.toDate()}
      disablePast={props.disablePast}
      className={props.classes.dateFieldContainer}
      onClose={handleOnClose}
      open={pickerIsOpen}
      TextFieldComponent={() => (
        <TextField
          className={props.classes.textField}
          variant="outlined"
          label={props.label}
          defaultValue={props.date}
          onClick={handleOnClick}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <DateRange />
              </InputAdornment>
            )
          }}
        />
      )}
      margin="normal"
      id="date-picker-dialog"
      value={props.date}
      onChange={(date: Date) => props.onChange(moment(date))}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
    />
  )
}

export default withStyles(styles)(DatePicker)

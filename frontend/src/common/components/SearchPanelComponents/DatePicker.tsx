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
import moment from 'moment'

interface IProps {
  date: string
  onClose?: () => void
  onChange: (date: string) => void
  onClick?: () => void
  label: string
  classes: any
}

const styles = (theme: Theme): StyleRules =>
  createStyles({
    textField: {
      '& *': {
        cursor: 'pointer !important',
        marginRight: theme.spacing(0.5)
      }
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

  const handleOnChange = (date: Date) => {
    props.onChange(moment(date).format('DDD/MM/YYYY'))
  }

  return (
    <KeyboardDatePicker
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
      format="MM/dd/yyyy"
      value={props.date}
      onChange={handleOnChange}
      KeyboardButtonProps={{
        'aria-label': 'change date'
      }}
    />
  )
}

export default withStyles(styles)(DatePicker)

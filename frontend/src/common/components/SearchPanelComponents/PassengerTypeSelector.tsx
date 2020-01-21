import React, { Fragment } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles,
  Theme,
  withStyles,
  TextField
} from '@material-ui/core'

interface IProps {
  classes: any
  value: number
  name: string
  onChange: (e: React.ChangeEvent<{ name?: any; value: number }>) => void
  admitsZero: boolean
}

const styles = (theme: Theme) =>
  createStyles({
    menu: {
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2)
    },
    label: {
      position: 'unset'
    }
  })

function PassengerTypeSelector({
  value,
  onChange,
  classes,
  name,
  admitsZero
}: IProps) {
  return (
    <FormControl className={classes.menu}>
      <InputLabel className={classes.label}>{`${value} ${name}`}</InputLabel>
      <Select value={value} onChange={onChange}>
        {admitsZero
          ? Array(9)
              .fill(0)
              .map((_, i: number) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))
          : Array(8)
              .fill(0)
              .map((_, i: number) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(PassengerTypeSelector)

import React, { useState, ChangeEvent } from 'react'
import {
  TextField,
  InputAdornment,
  withStyles,
  createStyles,
  Theme,
  Menu,
  Fade
} from '@material-ui/core'
import { PeopleAlt } from '@material-ui/icons'
import PassengerTypeSelector from './PassengerTypeSelector'

interface IProps {
  classes: any
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100px',
      '& *': {
        cursor: 'pointer !important',
        zIndex: 'unset'
      }
    }
  })

function PassengersAmountSelector(props: IProps) {
  const [totalPassengers, setTotalPassengers] = useState<number>(1)
  const [adultsNumber, setAdultsNumber] = useState<number>(1)
  const [childrenNumber, setChildrenNumber] = useState<number>(0)
  const [babiesNumber, setBabiesNumber] = useState<number>(0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (e: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(e.currentTarget)

  const handleCloseMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const total = [adultsNumber, childrenNumber, babiesNumber].reduce(
      (acc: number, curr: number) => acc + curr,
      0
    )
    setTotalPassengers(total)
    setAnchorEl(null)
  }

  const handleSetAdultsNumber = (e: ChangeEvent<{ value: number }>) =>
    setAdultsNumber(e.target.value as number)

  const handleSetChildrenNumber = (e: ChangeEvent<{ value: number }>) =>
    setChildrenNumber(e.target.value as number)

  const handleSetBabiesNumber = (e: ChangeEvent<{ value: number }>) =>
    setBabiesNumber(e.target.value as number)

  return (
    <div>
      <TextField
        onClick={handleOpenMenu}
        classes={{ root: props.classes.root }}
        variant="outlined"
        label="Passengers"
        value={totalPassengers}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end" className={props.classes.icons}>
              <PeopleAlt />
            </InputAdornment>
          )
        }}
      />
      <Menu
        open={Boolean(anchorEl)}
        TransitionComponent={Fade}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
      >
        {[
          {
            name: 'Adult',
            handler: handleSetAdultsNumber,
            value: adultsNumber
          },
          {
            name: 'Children',
            handler: handleSetChildrenNumber,
            value: childrenNumber
          },
          {
            name: 'Babies',
            handler: handleSetBabiesNumber,
            value: babiesNumber
          }
        ].map(
          (
            {
              name,
              handler,
              value
            }: {
              name: string
              handler: (a: ChangeEvent<{ name?: any; value: number }>) => void
              value: number
            },
            i: number
          ) => (
            <PassengerTypeSelector
              admitsZero={name === 'Children' || name === 'Babies'}
              value={value}
              onChange={handler}
              key={i}
              name={name}
            />
          )
        )}
      </Menu>
    </div>
  )
}
export default withStyles(styles)(PassengersAmountSelector)

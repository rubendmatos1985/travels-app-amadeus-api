import * as React from "react";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Paper, Grid, TextField, withStyles, createStyles, Theme } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StyleRules } from "@material-ui/core/styles";

const styles: (theme: Theme) => StyleRules = (theme: Theme) =>
  createStyles({
    input: {
      marginLeft: theme.spacing(1)
    },
    container: {
      width: "100%",
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    paper: {
      padding: theme.spacing(2),
      width: "70%",
      maxWidth: 900
    }
  });

const SearchPannel = (props: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date("2014-08-18T21:11:54"));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={props.classes.container}>
        <Paper className={props.classes.paper}>
          <TextField
            className={props.classes.input}
            id="standard-search"
            label="From"
            type="search"
            variant="outlined"
          />
          <TextField
            className={props.classes.input}
            id="standard-search1"
            label="To"
            type="search"
            variant="outlined"
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Departure"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={setSelectedDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Return"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={setSelectedDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Paper>
      </div>
    </MuiPickersUtilsProvider>
  );
};
export default withStyles(styles)(SearchPannel);

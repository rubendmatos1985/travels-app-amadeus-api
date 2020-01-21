import * as React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: "1vw",
      width: "100%"
    }
  });

const AppContainer = (props: any) => (
  <main className={props.classes.container}>{props.children}</main>
);

export default withStyles(styles)(AppContainer);

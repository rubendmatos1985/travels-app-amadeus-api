import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from "common/containers/AppBar/AppBar.component";
import { routes } from "./routes/routes";
import { ThemeProvider } from "@material-ui/styles";
import AppContainer from "./components/AppContainer";
import theme from "./theme";

const App = (props: any) => {
  return (
    <React.Fragment>
      <AppBar />
      <AppContainer>
        <Switch>
          {routes.map((route: any, i: number) => (
            <Route key={i} component={route.component} />
          ))}
        </Switch>
      </AppContainer>
    </React.Fragment>
  );
};

export default App;

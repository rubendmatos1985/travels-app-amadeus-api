import { Route, match } from "react-router-dom";
import Home from "common/pages/Home";
import "isomorphic-fetch";
import { ReactComponentElement, ComponentClass, ReactElement } from "react";

export interface SSRRoute {
  path: string;
  exact: boolean;
  component: any;
  needsFetchData: boolean;
  fetchData?: () => Promise<any>;
}

export const routes: SSRRoute[] = [
  {
    path: "/home",
    exact: true,
    component: Home,
    needsFetchData: true,
    fetchData: () => fetch("http://localhost:3000/recommendations")
  }
];

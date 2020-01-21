import Home from 'common/pages/Home'
import 'isomorphic-fetch'
import Test from 'common/pages/Test'
import { ReactElement } from 'react'
export interface SSRRoute {
  path: string
  exact: boolean
  component: (props: any) => ReactElement<any>
  needsFetchData: boolean
  fetchData?: () => Promise<any>
}

export const routes: SSRRoute[] = [
  {
    path: '/home',
    exact: true,
    component: Home,
    needsFetchData: true,
    fetchData: () => fetch('http://localhost:3000/recommendations')
  },
  {
    path: '/test',
    exact: true,
    component: Test,
    needsFetchData: false
  }
]

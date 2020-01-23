import Home from 'common/pages/Home'
import 'isomorphic-fetch'
import Test from 'common/pages/Test'

export interface SSRRoute {
  name: string
  path: string
  exact: boolean
  component: any
  needsFetchData: boolean
  fetchData?: () => Promise<any>
}

export const routes: SSRRoute[] = [
  {
    name: 'home',
    path: '/home',
    exact: true,
    component: Home,
    needsFetchData: true,
    fetchData: () => fetch('http://localhost:3000/recommendations')
  },
  {
    name: 'home',
    path: '/test',
    exact: true,
    component: Test,
    needsFetchData: false
  }
]

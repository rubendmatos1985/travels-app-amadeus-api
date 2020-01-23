import { Theme, StyleRules, createStyles } from '@material-ui/core'

export const searchPanelStyles: (theme: Theme) => StyleRules = (theme: Theme) =>
  createStyles({
    paper: {
      width: '80%',
      maxWidth: 1000,
      padding: theme.spacing(0.5)
    },
    searchPanelContainer: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-around'
    },
    searchCitiesContainer: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      justifyContent: 'space-around',
      display: 'flex',
      flexWrap: 'wrap'
    },
    searchDateContainer: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      display: 'flex'
    },
    searchButtonContainer: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      maxWidth: 'unset !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '100px'
    },
    searchPassengersContainer: {
      minWidth: '50px',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchButton: {
      width: 'unset !important'
    }
  })

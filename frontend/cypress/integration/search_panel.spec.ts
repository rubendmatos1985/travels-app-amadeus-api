import { selectOptionFromAutocomplete } from '../commons/select_option_from_autocomplete'

describe('<SearchPanel/>', () => {
  beforeEach(() => {
    cy.visit('localhost:8080')
  })

  it(
    'Origin Input -> select option from autocomplete',
    selectOptionFromAutocomplete({ tag: '#orgin-input', option: 'Berlin' })
  )
  it('Destination Input -> select option from autocomplete', () => {})

  it('Destination input-> do not have orgin input in suggestions list', () => {
    const input = cy.get('#origin-input')
  })
})

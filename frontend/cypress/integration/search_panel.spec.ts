describe('<SearchPanel/>', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
  });

  it(
    'Origin Input -> select option from autocomplete',
    selectOptionFromAutocomplete({ tag: '#orgin-input', option: 'Berlin' })
  );
  it('Destination Input -> select option from autocomplete', () => {});

  it('Destination input-> do not have orgin input in suggestions list', () => {
    const input = cy.get('#origin-input');
  });
});

interface ISelectOptionFromAutocompleteArgs {
  tag: string;
  option: string;
}

const selectOptionFromAutocomplete = ({
  tag,
  option
}: ISelectOptionFromAutocompleteArgs) => (): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy
    .get(tag)
    .type(option)
    .then(
      ($input: JQuery<HTMLInputElement>): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy
          .get('.MuiAutocomplete-listbox')
          .children()
          .first()
          .click({ force: true })
          .then(($li: JQuery<HTMLLIElement>): void => {
            const li: HTMLLIElement = $li.toArray()[0];
            const input: HTMLInputElement = $input.toArray()[0];
            expect(input.value).to.be.eq(li.innerText.split(' ').join(', '));
          })
    );

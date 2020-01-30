import { Context, Done, Func } from 'mocha';

describe('<SearchPanel/>', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
  });
  const selectOriginInput: Func = (<unknown>(
    selectOptionFromAutocomplete({ tag: '#origin-input', option: 'Berlin' })
  )) as Func;

  const selectDestinationInput: Func = (<unknown>(
    selectOptionFromAutocomplete({ tag: '#destination-input', option: 'Hamburg' })
  )) as Func;

  it('Origin Input -> select option from autocomplete', selectOriginInput);

  it('Destination Input -> select option from autocomplete', selectDestinationInput);

  it('Destination input-> do not have orgin input in suggestions list', () => {
    cy.get('#origin-input')
      .type('Berlin')
      .then(($originInput: JQuery<HTMLInputElement>) => {
        cy.get('.MuiAutocomplete-listbox')
          .children()
          .first()
          .click({ force: true });
        cy.get('#destination-input').type('B');
        cy.get('.MuiAutocomplete-listbox')
          .children()
          .then(($liElements: JQuery<HTMLLIElement>) => {
            const originInput: HTMLInputElement = $originInput.toArray()[0];
            const listElements: HTMLLIElement[] = $liElements.toArray();
            expect(listElements.some((li: HTMLLIElement) => li.innerText === originInput.value)).to
              .be.false;
          });
      });
  });
});

function selectOptionFromAutocomplete({ tag, option }: { tag: string; option: string }) {
  return () => {
    cy.get(tag)
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
  };
}

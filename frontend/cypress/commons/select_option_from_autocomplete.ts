export const selectOptionFromAutocomplete = ({
  tag,
  option
}: {
  tag: string
  option: string
}) => () =>
  cy
    .get(tag)
    .type(option)
    .then(
      (
        $input: JQuery<HTMLInputElement>
      ): Cypress.Chainable<JQuery<HTMLElement>> =>
        cy
          .get('.MuiAutocomplete-listbox')
          .children()
          .first()
          .click({ force: true })
          .then(($li: JQuery<HTMLLIElement>): void => {
            const li: HTMLLIElement = $li.toArray()[0]
            const input: HTMLInputElement = $input.toArray()[0]
            expect(input.value).to.be.eq(li.innerText.split(' ').join(', '))
          })
    )

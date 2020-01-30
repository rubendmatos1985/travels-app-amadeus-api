import moment from 'moment';

describe('Dates Components', () => {
  before(() => {
    cy.visit('localhost:8080');
  });
  it('Depart and Return Dates start with 7 days difference', () => {
    cy.get('#depart-date').then(($departDate: JQuery<HTMLInputElement>) => {
      cy.get('#return-date').then(($returnDate: JQuery<HTMLInputElement>) => {
        const departDate: HTMLInputElement = $departDate.toArray()[0];
        const returnDate: HTMLInputElement = $returnDate.toArray()[0];

        const departPlus7: string = moment(departDate.value, 'DD/MM/YYYY')
          .clone()
          .add(7, 'days')
          .format('DD/MM/YYYY');

        assert.equal(departPlus7, returnDate.value, 'Equal');
      });
    });
  });

  it('All Dates before Today are disabled', () => {
    cy.get('#depart-date').click();

    cy.get('div[role=presentation]').then(($el: JQuery<HTMLDivElement>) => {
      const today = moment().toArray()[2];
      const elements = $el.toArray();
      const result: string[] = elements
        .filter(
          (el: HTMLDivElement) =>
            !el.children[0].classList.contains('MuiPickersDay-dayDisabled') &&
            !el.children[0].classList.contains('MuiPickersDay-hidden')
        )
        .map((el: HTMLDivElement) => el.textContent);

      expect(result.every((v: string) => parseInt(v) >= today)).to.be.true;
    });
  });
});

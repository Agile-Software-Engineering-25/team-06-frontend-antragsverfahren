describe('Forms Page', () => {
  it('should load the forms page', () => {
    cy.visit('/');
    cy.contains('Für eine Nachklausur beantragen');
  });
  it('should load the Studienbescheinigung Accordion', () => {
    cy.visit('/');
    cy.contains('Studienbescheinigung herunterladen');

    // cy.get('#root > div > div > button').click();
    // cy.wait('@getCurrentWeather');

    // cy.get('p.MuiTypography-root:nth-child(5)')
    //   .should('exist')
    //   .should('contain.text', '20.2 °C'); // change selector as needed
  });
});

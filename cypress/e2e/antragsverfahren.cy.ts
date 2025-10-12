describe('Forms Page', () => {
  it('should load the forms page', () => {
    cy.visit('/');
    cy.contains('Nachklausurantrag' && 'Bachelorarbeitanmeldung');
  });
  it('should load the Studienbescheinigung Card', () => {
    cy.visit('/');
    cy.contains('Studienbescheinigung');
  });
});

describe('Forms Page Accordion Nachklausur', () => {
  it('should load the Nachklausurantrag-Akkordion', () => {
    cy.visit('/?accordion=nachklausur');
    cy.contains('Antrag einreichen');
  });
});

describe('Forms Page Accordion Bachelorakkordion', () => {
  it('should load the Nachklausurantrag-Akkordion', () => {
    cy.visit('/?accordion=bachelor');
    cy.contains('Exposé hochladen');
  });
});

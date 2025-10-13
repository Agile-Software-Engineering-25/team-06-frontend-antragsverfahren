const texts = {
  formsPage: {
    nachklausur: { de: 'Nachklausurantrag', en: 'Re-examination application' },
    bachelor: { de: 'Bachelorarbeitanmeldung', en: 'Bachelor thesis registration' },
    card: { de: 'Studienbescheinigung', en: 'Study certificate' },
    nachklausurAccordion: { de: 'Antrag einreichen', en: 'Submit application' },
    bachelorAccordion: { de: 'Exposé hochladen', en: 'Upload exposé' },
  }
};

// Funktion, die das richtige Element prüft
function containsTextDeOrEn(deText, enText) {
  cy.contains(deText).then($el => {
    // Wenn Deutsch existiert, alles gut
    if ($el.length) return;
    // Wenn nicht, prüfe Englisch
    cy.contains(enText);
  });
}

describe('Forms Page', () => {
  it('should load the forms page', () => {
    cy.visit('/');
    containsTextDeOrEn(texts.formsPage.nachklausur.de, texts.formsPage.nachklausur.en);
    containsTextDeOrEn(texts.formsPage.bachelor.de, texts.formsPage.bachelor.en);
  });

  it('should load the Studienbescheinigung Card', () => {
    cy.visit('/');
    containsTextDeOrEn(texts.formsPage.card.de, texts.formsPage.card.en);
  });
});

describe('Forms Page Accordion Nachklausur', () => {
  it('should load the Nachklausurantrag-Akkordion', () => {
    cy.visit('/?accordion=nachklausur');
    containsTextDeOrEn(texts.formsPage.nachklausurAccordion.de, texts.formsPage.nachklausurAccordion.en);
  });
});

describe('Forms Page Accordion Bachelorakkordion', () => {
  it('should load the Bachelor-Akkordion', () => {
    cy.visit('/?accordion=bachelor');
    containsTextDeOrEn(texts.formsPage.bachelorAccordion.de, texts.formsPage.bachelorAccordion.en);
  });
});

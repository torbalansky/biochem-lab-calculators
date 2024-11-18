context('Home Page', () => {
  beforeEach(() => {
    cy.visit('https://biochem-lab-calculators.vercel.app/');
  });

  it('should load the homepage correctly', () => {
    cy.get('h1').should('have.text', 'Welcome to the Scientific Calculators Hub');
    cy.get('p').should('contain.text', 'Explore a wide range of scientific calculators to assist with your research and experiments');
    cy.get('.home-content').should('be.visible');
  });

  it('should display all calculator fields with icons', () => {
    cy.get('.calculator-field').should('have.length', 15);
  });

  it('should trigger AOS animation on page load', () => {
    cy.get('.home-content').should('be.visible');
  });
});

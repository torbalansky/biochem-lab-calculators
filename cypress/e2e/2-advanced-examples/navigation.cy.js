/// <reference types="cypress" />

describe('Navbar Functionality', () => {
  beforeEach(() => {
    cy.visit('https://biochem-lab-calculators.vercel.app/');
  });

  it('Navbar should be visible on page load', () => {
    cy.get('nav').should('be.visible');
  });

  it('should navigate to the correct pages', () => {
    cy.get('button[title="Back to Home"]').click();
    cy.location('pathname').should('eq', '/');

    cy.get('a[title="LabBook and Calculator"]').click();
    cy.location('pathname').should('eq', '/calculator');
  });

  it('should open and navigate through the dropdown menu', () => {
    cy.get('button').contains('Calculators').click();
    cy.get('ul').should('be.visible');
  });

  it('should maintain the default state after reload', () => {
    cy.get('button').contains('Calculators').click();
    cy.get('ul').should('be.visible');
    cy.reload();
    cy.get('ul').should('not.exist');
  });

  it('should display the correct menu on different screen sizes', () => {
    cy.viewport(1280, 720);
    cy.get('.md\\:hidden').should('not.be.visible');
    cy.get('.navbar').should('be.visible');

    cy.viewport('iphone-6');
    cy.get('.navbar').should('not.be.visible');
  });
});

import MolarityCalculator from '../../src/components/MolarityCalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Molarity Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <MolarityCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate the mass correctly based on formula weight, volume, and concentration', () => {
    cy.get('input[placeholder="Enter formula weight"]')
      .type('180'); 

    cy.get('input[placeholder="Enter volume"]')
      .type('1');

    cy.get('input[placeholder="Enter concentration"]')
      .type('1'); 

    cy.get('p').contains('Mass:').should('exist');
    cy.get('.text-green-400').should('contain', '180');
  });

  it('should show an error when invalid input is provided (negative or zero values)', () => {
    cy.get('input[placeholder="Enter formula weight"]')
      .type('-180');

    cy.get('input[placeholder="Enter volume"]')
      .type('0'); 

    cy.get('input[placeholder="Enter concentration"]')
      .type('-1');
    cy.get('.text-red-800').should('contain', 'Please enter positive values for all fields.');
  });

  it('should clear all fields when the "Clear Fields" button is clicked', () => {
    cy.get('input[placeholder="Enter formula weight"]')
      .type('180');

    cy.get('input[placeholder="Enter volume"]')
      .type('1');

    cy.get('input[placeholder="Enter concentration"]')
      .type('1');
    cy.get('button').contains('Clear Fields').click();
    cy.get('input[placeholder="Enter formula weight"]').should('have.value', '');
    cy.get('input[placeholder="Enter volume"]').should('have.value', '');
    cy.get('input[placeholder="Enter concentration"]').should('have.value', '');
    cy.get('.text-red-800').should('not.exist');
    cy.get('.text-green-400').should('not.exist');
  });

  it('should display the theory section when the "Show Theory" button is clicked', () => {
    cy.get('.lg:block').should('not.exist');
    cy.get('button').contains('Show Theory').click();
  });

  it('should display the correct steps when mass is calculated', () => {
    cy.get('input[placeholder="Enter formula weight"]')
      .type('180');
  
    cy.get('input[placeholder="Enter volume"]')
      .type('1');
  
    cy.get('input[placeholder="Enter concentration"]')
      .type('1');
    cy.get('.steps').should('exist');
    
    cy.get('.step').should('have.length', 5);
  });  
});

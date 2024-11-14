import PercentCalculator from '../../src/components/PercentCalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Percent Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <PercentCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate the weight of solute correctly for w/v percent calculator', () => {
    cy.get('input[placeholder="Enter %"]')
      .type('10');

    cy.get('input[placeholder="Enter volume in mL"]')
      .type('200');

    cy.get('p').contains('Weight needed:').should('exist');
    cy.get('.text-green-400').should('contain', '20.00 g');
  });

  it('should show an error when invalid input is provided for w/v (negative or zero values)', () => {
    cy.get('input[placeholder="Enter %"]')
      .type('-10');

    cy.get('input[placeholder="Enter volume in mL"]')
      .type('200');
      
    cy.get('.text-red-800').should('contain', 'Please enter positive values for both fields.');
  });

  it('should calculate the stock volume correctly for v/v percent calculator', () => {
    cy.get('input[placeholder="Enter stock concentration (%)"]')
      .type('50');

    cy.get('input[placeholder="Enter desired concentration (%)"]')
      .type('10');

    cy.get('input[placeholder="Enter final volume in mL"]')
      .type('1000');

    cy.get('p').contains('Stock volume needed:').should('exist');
    cy.get('.bg-slate-900').should('contain', '200.00 mL');
  });

  it('should show an error when invalid input is provided for v/v (negative or zero values)', () => {
    cy.get('input[placeholder="Enter stock concentration (%)"]')
      .type('-50');

    cy.get('input[placeholder="Enter desired concentration (%)"]')
      .type('10'); 

    cy.get('input[placeholder="Enter final volume in mL"]')
      .type('1000');
      
    cy.get('.text-red-800').should('contain', 'Please enter positive values for all fields.');
  });

  it('should show an error if desired concentration exceeds stock concentration in v/v calculator', () => {
    cy.get('input[placeholder="Enter stock concentration (%)"]')
      .type('10'); 

    cy.get('input[placeholder="Enter desired concentration (%)"]')
      .type('20'); 

    cy.get('input[placeholder="Enter final volume in mL"]')
      .type('1000');

    cy.get('.text-red-800').should('contain', 'Desired concentration must be less than the stock concentration.');
  });

  it('should clear all fields when the "Clear Form" button is clicked for w/v calculator', () => {
    cy.get('input[placeholder="Enter %"]')
      .type('10');

    cy.get('input[placeholder="Enter volume in mL"]')
      .type('200');

    cy.get('button').contains('Clear Form').click();
    
    cy.get('input[placeholder="Enter %"]').should('have.value', '');
    cy.get('input[placeholder="Enter volume in mL"]').should('have.value', '');
    cy.get('.text-red-800').should('not.exist');
    cy.get('.text-green-400').should('not.exist');
  });

  it('should display the theory section when the "Show Theory" button is clicked', () => {
    cy.get('.lg:block').should('not.exist');
    cy.get('button').contains('Show Theory').click();
  });
});

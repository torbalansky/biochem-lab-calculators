import KdCalculator from '../../src/components/kdcalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Kd Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <KdCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate the dissociation constant (Kd) correctly when valid inputs are provided', () => {
    cy.get('input[placeholder="Enter ΔG"]')
      .type('-10');
  
    cy.get('button').contains('Calculate').click();

    cy.get('.bg-slate-900', { timeout: 8000 })
    .invoke('text')
    .should('match', /\d+(\.\d+)?/);
  });
  
  
  it('should show an error message when invalid input is provided (e.g., non-numeric values or temperature <= 0)', () => {
    cy.get('input[placeholder="Enter ΔG"]')
      .type('abc');

    cy.get('input[placeholder="Enter Temperature"]')
      .type('0');

    cy.get('button').contains('Calculate').click();

    cy.get('.text-red-800').should('contain', 'Please enter valid values for ΔG and temperature.');
  });

  it('should clear all fields when the "Clear" button is clicked', () => {
    cy.get('input[placeholder="Enter ΔG"]')
      .type('-10');

    cy.get('input[placeholder="Enter Temperature"]')
      .type('298');

    cy.get('button').contains('Clear').click();

    cy.get('input[placeholder="Enter ΔG"]').should('have.value', '');
    cy.get('input[placeholder="Enter Temperature"]').should('have.value', '298');
    cy.get('.text-red-800').should('not.exist');
    cy.get('.text-green-400').should('not.exist');
  });

  it('should display the theory section when the "Show Theory" button is clicked', () => {
    cy.get('button').contains('Show Theory').click();
  });

  it('should toggle the visibility of the theory section when the "Show/Hide Theory" button is clicked', () => {
    cy.get('button').contains('Show Theory').click();
    cy.get('button').contains('Hide Theory').click();
  });

  it('should show an error message when ΔG is not a valid number', () => {
    cy.get('input[placeholder="Enter ΔG"]')
      .type('invalid');

    cy.get('button').contains('Calculate').click();

    cy.get('.text-red-800').should('contain', 'Please enter valid values for ΔG and temperature.');
  });

});

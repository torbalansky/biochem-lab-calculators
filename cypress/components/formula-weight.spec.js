import FormulaWCalculator from '../../src/components/FormulaWCalculator';
import React from 'react';
import { mount } from '@cypress/react18';

describe('Formula Weight Calculator', () => {
  beforeEach(() => {
    mount(<FormulaWCalculator />);
  });

  it('should calculate the molecular weight of a valid formula (C6H12O6)', () => {
    cy.get('input[placeholder="E.g., C6H12O6 (Capital Letters)"]')
      .type('C6H12O6');
    cy.get('button').contains('Calculate').click();

    cy.get('.text-green-400').should('contain', '180.16 g/mol');
  });

  it('should show an error for an invalid formula (lowercase letters)', () => {
    cy.get('input[placeholder="E.g., C6H12O6 (Capital Letters)"]')
      .type('c6h12o6');
    cy.get('button').contains('Calculate').click();

    cy.get('.text-red-800').should('contain', 'Please use capital letters for element symbols');
  });

  it('should clear the input fields when the "Clear" button is clicked', () => {
    cy.get('input[placeholder="E.g., C6H12O6 (Capital Letters)"]')
      .type('C6H12O6');
    cy.get('button').contains('Clear').click();
    cy.get('input[placeholder="E.g., C6H12O6 (Capital Letters)"]').should('have.value', '');
    cy.get('.text-green-400').should('not.exist');
  });

  it('should display the correct atom breakdown for C6H12O6', () => {
    cy.get('input[placeholder="E.g., C6H12O6 (Capital Letters)"]')
      .type('C6H12O6');
    cy.get('button').contains('Calculate').click();
    cy.get('table').find('tr').should('have.length', 4);

    cy.get('table')
      .contains('C')
      .should('exist')
      .parent()
      .contains('6');

    cy.get('table')
      .contains('H')
      .should('exist')
      .parent()
      .contains('12');

    cy.get('table')
      .contains('O')
      .should('exist')
      .parent()
      .contains('6');
  });
});
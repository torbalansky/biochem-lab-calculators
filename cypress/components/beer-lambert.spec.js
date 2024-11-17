import BeerLambertCalculator from '../../src/components/BeerLambertCalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Beer Lambert Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <BeerLambertCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate absorbance correctly when provided with extinction coefficient, concentration, and path length', () => {
    cy.get('input[placeholder="Enter value"]').eq(0).type('5');
    cy.get('input[placeholder="Enter value"]').eq(1).type('1');
    cy.get('input[placeholder="Enter value"]').eq(2).type('0.1');
    cy.get('button').contains('Calculate').click();
    cy.get('input[placeholder="Enter value"]').eq(3).should('have.value', '0.50');
  });

  it('should calculate concentration correctly when provided with absorbance, extinction coefficient, and path length', () => {
    cy.get('input[placeholder="Enter value"]').eq(0).type('5');
    cy.get('input[placeholder="Enter value"]').eq(1).type('1');
    cy.get('input[placeholder="Enter value"]').eq(3).type('0.5');
    cy.get('button').contains('Calculate').click();
    cy.get('input[placeholder="Enter value"]').eq(2).should('have.value', '0.1');
  });

  it('should display an error when less than three values are provided', () => {
    cy.get('input[placeholder="Enter value"]').eq(0).type('5');
    cy.get('input[placeholder="Enter value"]').eq(1).type('1');
    cy.get('button').contains('Calculate').click();
    cy.get('.text-red-800').should('contain', 'Please enter values for any three of the four parameters.');
  });

  it('should clear all fields when the "Clear" button is clicked', () => {
    cy.get('input[placeholder="Enter value"]').eq(0).type('5');
    cy.get('input[placeholder="Enter value"]').eq(1).type('1');
    cy.get('input[placeholder="Enter value"]').eq(2).type('0.1');
    cy.get('input[placeholder="Enter value"]').eq(3).type('0.5');
    cy.get('button').contains('Clear').click();
    cy.get('input[placeholder="Enter value"]').each(($el) => {
      cy.wrap($el).should('have.value', '');
    });
    cy.get('.text-red-800').should('not.exist');
  });

  it('should calculate extinction coefficient correctly when provided with absorbance, concentration, and path length', () => {
    cy.get('input[placeholder="Enter value"]').eq(1).type('1');
    cy.get('input[placeholder="Enter value"]').eq(2).type('0.1');
    cy.get('input[placeholder="Enter value"]').eq(3).type('0.5');
    cy.get('button').contains('Calculate').click();
    cy.get('input[placeholder="Enter value"]').eq(0).should('have.value', '5');
  });
});

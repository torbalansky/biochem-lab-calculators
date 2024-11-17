import DnaRnaCalculator from '../../src/components/DNAconCalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('DNA/RNA Concentration Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <DnaRnaCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate concentration correctly for dsDNA', () => {
    cy.get('select').select('dsDNA');
    cy.get('input[placeholder="Enter absorbance"]').type('0.45');
    cy.get('button').contains('Calculate').click();
    cy.contains('Concentration: 22.5 µg/mL').should('be.visible');
  });

  it('should calculate concentration correctly for ssDNA', () => {
    cy.get('select').select('ssDNA');
    cy.get('input[placeholder="Enter absorbance"]').type('0.45');
    cy.get('button').contains('Calculate').click();
    cy.contains('Concentration: 14.85 µg/mL').should('be.visible');
  });

  it('should display an error message when inputs are invalid', () => {
    cy.get('select').select('dsDNA');
    cy.get('input[placeholder="Enter absorbance"]').type('invalid');
    cy.get('input[placeholder="Enter dilution factor"]').type('2');
    cy.get('input[placeholder="Enter path length"]').type('1');
    cy.get('button').contains('Calculate').click();
    cy.contains('Please ensure all inputs are valid.').should('be.visible');
  });

  it('should clear all fields and results when "Clear" button is clicked', () => {
    cy.get('select').select('dsDNA');
    cy.get('input[placeholder="Enter absorbance"]').type('0.45');
    cy.get('input[placeholder="Enter dilution factor"]').type('2');
    cy.get('input[placeholder="Enter path length"]').type('1');
    cy.get('button').contains('Clear').click();
    cy.get('input[placeholder="Enter absorbance"]').should('have.value', '');
    cy.get('input[placeholder="Enter dilution factor"]').should('have.value', '1');
    cy.get('input[placeholder="Enter path length"]').should('have.value', '1');
    cy.contains('Concentration:').should('not.exist');
  });

  it('should calculate concentration correctly for RNA', () => {
    cy.get('select').select('RNA');
    cy.get('input[placeholder="Enter absorbance"]').type('0.45');
    cy.get('button').contains('Calculate').click();
    cy.contains('Concentration: 18 µg/mL').should('be.visible');
  });
});

import CalibrationCurveCalculator from '../../src/components/CalibrationCurveCalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Calibration Curve Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <CalibrationCurveCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate unknown concentration correctly', () => {
    cy.get('input[placeholder="Enter the slope"]').type('2'); 
    cy.get('input[placeholder="Enter the intercept"]').type('5');
    cy.get('input[placeholder="Enter the signal"]').type('15'); 
    cy.get('button').contains('Calculate').click();
    cy.contains('Unknown Concentration: 5').should('be.visible');
  });

  it('should display an error message if any field is missing', () => {
    cy.get('input[placeholder="Enter the slope"]').type('2');
    cy.get('input[placeholder="Enter the signal"]').type('15');
    cy.get('button').contains('Calculate').click();
    cy.contains('Please fill in all fields.').should('be.visible');
  });

  it('should clear all fields and results when "Clear" button is clicked', () => {
    cy.get('input[placeholder="Enter the slope"]').type('2');
    cy.get('input[placeholder="Enter the intercept"]').type('5');
    cy.get('input[placeholder="Enter the signal"]').type('15');
    cy.get('button').contains('Clear').click();
    cy.get('input[placeholder="Enter the slope"]').should('have.value', '');
    cy.get('input[placeholder="Enter the intercept"]').should('have.value', '');
    cy.get('input[placeholder="Enter the signal"]').should('have.value', '');
    cy.contains('Unknown Concentration:').should('not.exist');
    cy.contains('Please fill in all fields.').should('not.exist');
  });

  it('should toggle theory visibility when "Show Theory" or "Hide Theory" is clicked', () => {
    cy.get('button').contains('Show Theory').click();
    cy.contains('A calibration curve is a graphical representation').should('be.visible');
    cy.get('button').contains('Hide Theory').click();
  });
});

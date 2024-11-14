import DilutionCalculator from '../../src/components/DilutionCalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Dilution Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <DilutionCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate the stock volume correctly based on stock concentration, final volume, and desired concentration', () => {
    cy.get('input[placeholder="Enter stock concentration"]')
      .type('0.5'); 

    cy.get('input[placeholder="Enter desired concentration"]')
      .type('0.1');

    cy.get('input[placeholder="Enter final volume"]')
      .type('1'); 

    cy.get('p').contains('Stock Volume (V1):').should('exist');
    cy.get('.text-green-400').should('contain', '0.2 L');
  });

  it('should show an error when invalid input is provided (negative or zero values)', () => {
    cy.get('input[placeholder="Enter stock concentration"]')
      .type('-0.5');

    cy.get('input[placeholder="Enter desired concentration"]')
      .type('0.1'); 

    cy.get('input[placeholder="Enter final volume"]')
      .type('1');
    cy.get('.text-red-800').should('contain', 'Please enter positive values for all fields.');
  });

  it('should show an error when desired concentration exceeds stock concentration', () => {
    cy.get('input[placeholder="Enter stock concentration"]')
      .type('0.1');

    cy.get('input[placeholder="Enter desired concentration"]')
      .type('0.5'); 

    cy.get('input[placeholder="Enter final volume"]')
      .type('1');
    cy.get('.text-red-800').should('contain', 'Ups! Desired concentration cannot exceed stock concentration.');
  });

  it('should clear all fields when the "Clear Fields" button is clicked', () => {
    cy.get('input[placeholder="Enter stock concentration"]')
      .type('0.5');

    cy.get('input[placeholder="Enter desired concentration"]')
      .type('0.1');

    cy.get('input[placeholder="Enter final volume"]')
      .type('1');
    cy.get('button').contains('Clear Fields').click();
    cy.get('input[placeholder="Enter stock concentration"]').should('have.value', '');
    cy.get('input[placeholder="Enter desired concentration"]').should('have.value', '');
    cy.get('input[placeholder="Enter final volume"]').should('have.value', '');
    cy.get('.text-red-800').should('not.exist');
    cy.get('.text-green-400').should('not.exist');
  });

  it('should display the theory section when the "Show Theory" button is clicked', () => {
    cy.get('.lg:block').should('not.exist');
    cy.get('button').contains('Show Theory').click();
  });

  it('should display the correct steps when stock volume is calculated', () => {
    cy.get('input[placeholder="Enter stock concentration"]')
      .type('0.5');
  
    cy.get('input[placeholder="Enter desired concentration"]')
      .type('0.1');
  
    cy.get('input[placeholder="Enter final volume"]')
      .type('1');
    cy.get('.steps').should('exist');
    
    cy.get('.step').should('have.length', 5);
  });
});

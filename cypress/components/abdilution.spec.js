import AntibodyDilutionCalculator from '../../src/components/AntibodyDilution';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('Antibody Dilution Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <AntibodyDilutionCalculator />
      </BrowserRouter>
    );
  });

  it('should calculate the correct stock volume when valid inputs are provided', () => {
    cy.get('select').first().select('1:100');
    cy.get('select').last().select('10');
    cy.get('p').contains('Volume of Stock Antibody:').should('exist');
    cy.get('strong').contains('100 μl').should('be.visible');
  });

  it('should clear all fields when the "Clear Fields" button is clicked', () => {
    cy.get('select').first().select('1:100');
    cy.get('select').last().select('10');
    cy.get('button').contains('Clear Fields').click();

    cy.get('select').first().should('have.value', '');
    cy.get('select').last().should('have.value', '');
    cy.get('p').contains('Volume of Stock Antibody:').should('not.exist');
    cy.get('p').contains('Please select both dilution and final volume.').should('not.exist');
  });

  it('should toggle the theory section visibility', () => {
    cy.get('button').contains('Show Theory').click();
    cy.contains('Western Blot Antibody Dilution').should('be.visible');
    cy.get('button').contains('Hide Theory').click();
  });

  it('should show the preparation steps when stock volume is calculated', () => {
    cy.get('select').first().select('1:1000');
    cy.get('select').last().select('20');
    cy.get('strong').contains('20 μl').should('be.visible');
    cy.get('.steps').should('exist');
    cy.get('.step').should('have.length', 4);
  });
});

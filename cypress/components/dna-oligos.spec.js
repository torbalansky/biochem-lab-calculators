import DNAoligos from '../../src/components/DNAoligoscalculator';
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('DNA Oligos Calculator', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <DNAoligos />
      </BrowserRouter>
    );
  });

  describe('Oligo Calculator', () => {
    it('should render the Oligo Calculator page', () => {
      cy.get('h2').contains('Theory');
      cy.get('button').contains('Calculate').should('exist');
      cy.get('button').contains('Show Theory').should('exist');
    });

    it('should show an error message if sequence is empty', () => {
      cy.get('button').contains('Calculate').click();
      cy.contains('Please enter a sequence').should('be.visible');
    });

    it('should show an error for invalid sequence length', () => {
        cy.get('textarea').type('ATCG'.repeat(51));
        cy.get('button').contains('Calculate').click();
        cy.contains('Sequence must be 200 bases or fewer.').should('be.visible');
      });

      it('should show an error if RNA contains T', () => {
        cy.get('select').select('RNA');
        cy.get('textarea').type('ATCG');
        cy.get('button').contains('Calculate').click();
        cy.get('.text-red-800')
          .should('be.visible')
      });      

      it('should show an error if DNA contains U', () => {
        cy.get('select').select('DNA');
        cy.get('textarea').type('AUCG');
        cy.get('button').contains('Calculate').click();
        cy.get('.text-red-800')
          .should('be.visible')
      });

      it('should calculate molecular weight, extinction coefficient, Tm, and concentration', () => {
        cy.get('textarea').type('ATCG');
        cy.get('button').contains('Calculate').click();
  
        cy.get('.molecular-weight').should('not.be.null');
        cy.get('.extinction-coefficient').should('not.be.null');
        cy.get('.tm').should('not.be.null');
        cy.get('.concentration').should('not.be.null');
      });

      it('should toggle the theory section visibility', () => {
        cy.get('button').contains('Show Theory').click();
        cy.get('button').contains('Hide Theory').click();
      });

      it('should toggle between RNA and DNA sequence types correctly', () => {
        cy.get('select').select('RNA');
        cy.get('textarea').should('have.attr', 'placeholder', 'Enter sequence (max. 200 bases)');
        
        cy.get('select').select('DNA');
        cy.get('textarea').should('have.attr', 'placeholder', 'Enter sequence (max. 200 bases)');
      });

      it('should clear the fields when the clear button is clicked', () => {
        cy.get('textarea').type('ATGC');
        cy.get('button').contains('Calculate').click();
        cy.get('button').contains('Clear').click();
        cy.get('textarea').should('have.value', '');
      });
  });
});

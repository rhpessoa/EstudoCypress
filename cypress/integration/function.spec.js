/// <reference types="cypress" />

import loc from '../support/locators';
import '../support/commandsAccount';

describe('Should teste a function level', () => {
    before(() => {
        cy.login('donodo', '123456')

    })
    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetAPP()
    })

    it('Should create an count ', () => {
        cy.acessarMenuContas()

        cy.wait(3000)
        cy.inserirConta('conta_teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('should update an count', () => {
        cy.acessarMenuContas()

        cy.xpath(loc.ACCOUNT.FN_XP_BTN_CHANGE_ACCOUNT('Conta para alterar')).click()
        cy.get(loc.ACCOUNT.ACCOUNTS_NAME)
            .clear()
            .type('conta_alterada')
        cy.get(loc.ACCOUNT.BTN_SAVE_ACCOUNT).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('should not create an account with same name', () => {
        cy.acessarMenuContas()

        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('should create a transaction', () => {
        cy.get(loc.MENU.TRANSACTIONS).click()
        cy.get(loc.TRANSACTIONS.DESCRIPTION).type('uma_descricao_da_venda')
        cy.wait(4000)
        cy.get(loc.TRANSACTIONS.VALUE).type('123')
        cy.get(loc.TRANSACTIONS.INTERESTED).type('NU')
        cy.get(loc.TRANSACTIONS.CONTA).select('Conta para movimentacoes')
        cy.get(loc.TRANSACTIONS.STATUS).click()
        cy.get(loc.TRANSACTIONS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRACT.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRACT.FN_XP_BUSCA_ELEMENTO('uma_descricao_da_venda', '123')).should('exist')
    })
    it('should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRACT.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.wait(2000)
        cy.get(loc.TRANSACTIONS.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.TRANSACTIONS.STATUS).click()
        cy.get(loc.TRANSACTIONS.BTN_SALVAR).click()

        cy.get(loc.MENU.HOME).click()
        cy.wait(2000)
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })
    it('should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRACT.FN_XP_EXCLUIR_ELEMENTO('Movimentacao para exclusao')).click()

    })
})

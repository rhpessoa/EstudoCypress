import loc from '../support/locators'

Cypress.Commands.add('acessarMenuContas', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNTS).click()
})

Cypress.Commands.add('inserirConta', conta => {
    cy.get(loc.ACCOUNT.ACCOUNTS_NAME).type(conta)
    cy.get(loc.ACCOUNT.BTN_SAVE_ACCOUNT).click()
})

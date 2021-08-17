const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        TRANSACTIONS: '[data-test=menu-movimentacao] > .fas',
        EXTRATO: '[data-test=menu-extrato]'
    },
    ACCOUNT: {
        ACCOUNTS_NAME: '[data-test=nome]',
        BTN_SAVE_ACCOUNT: '.btn',
        FN_XP_BTN_CHANGE_ACCOUNT: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    TRANSACTIONS: {
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        INTERESTED: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRACT: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_EXCLUIR_ELEMENTO: nome => `//li[contains(., '${nome}')]//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: test => `//li[contains(., '${test}')]//i[@class='fas fa-edit']`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]//../td[2]`
    },
    MESSAGE: '.toast-message',

}
export default locators;
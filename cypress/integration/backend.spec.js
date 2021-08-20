/// <reference types="cypress" />

describe('Should teste a backend level', () => {
    let token
    before(() => {
        cy.getToken('donodo', '123456').then(tkn => {
            token = tkn
        })

    })
    beforeEach(() => {
        cy.resetRest('donodo', '123456')
    })

    it('Should create an count ', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

})

it('should update an count', () => {

})

it('should not create an account with same name', () => {

})

it('should create a transaction', () => {

})
it('should get balance', () => {

})
it('should remove a transaction', () => {

})


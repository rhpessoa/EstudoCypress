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


    it('should update an count', () => {
        cy.getAccountByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'conta alterada via rest'
                    }
                }).as('response')

            })
        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })

    })

    it('should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: Cypress.dayjs().format('DD/MM/YYYY'),
                        descricao: "Desc",
                        envolvido: "Nu",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })
    it('should get balance', () => {

    })
    it('should remove a transaction', () => {

    })

})






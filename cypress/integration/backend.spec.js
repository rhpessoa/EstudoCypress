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
            // headers: { Authorization: `JWT ${token}` },
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
                    //   headers: { Authorization: `JWT ${token}` },
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
            //  headers: { Authorization: `JWT ${token}` },
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
                    //    headers: { Authorization: `JWT ${token}` },
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
        cy.request({
            method: 'GET',
            url: '/saldo',
            //  headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null
            console.log(saldoConta)
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //  headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //   headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_pagamento: Cypress.dayjs().format('DD/MM/YYYY'),
                    data_transacao: Cypress.dayjs().format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })
        cy.request({
            method: 'GET',
            url: '/saldo',
            //  headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null
            console.log(saldoConta)
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })

    })

    it('should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //  headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                //     headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })
    })

})






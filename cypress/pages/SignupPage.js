

class SignupPage {

    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(entregador) {
        cy.get('input[name="fullName"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        cy.contains('.delivery-method li', entregador.metodo_entrega)
        cy.get('input[accept^="image"]').selectFile('cypress/fixtures/cnh-digital.jpg', {force: true})
    }

    submit() {
        cy.get('form button[class="button-success"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-popup').should('be.visible')
            .within(() => {
                cy.get('.swal2-success-ring').should('be.visible')
                cy.get('#swal2-title').should('have.text', 'Aí Sim...')
                cy.get('.swal2-html-container').should('have.text', expectedMessage)

            })
    }

    alertMessageShouldBe(expectedMessage) {
        // cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

    closeModalContent() {
        cy.get('.swal2-confirm').click()
    }

    checkBackHome() {
        cy.get('.content').within(() => {
            cy.get('h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
        })
    }

}

export default new SignupPage; // "NEW" foi inserido e já exporta instanciado
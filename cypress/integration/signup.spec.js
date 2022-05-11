import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import signupPage from '../pages/SignupPage'

describe('Signup', () => {

    // var signup = new SignupPage() -> INSTANCIA FOI RETIRADA E INSERIDA DIRETO NA IMPORTAÇÃO DA PRIMEIRA LINHA

    // beforeEach(function() {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })

    it('User should become delivery', function() {
        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
        signup.closeModalContent()
        signup.checkBackHome()
    })
    
    it('Invalid document', function() {
        var deliver = signupFactory.deliver()
        deliver.cpf = 'abc06640928'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })    
    
    it('Invalid e-mail', function() {
        var deliver = signupFactory.deliver()
        deliver.email = 'vcolode.gmail.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    // Context implementado no lugar do it simples da linha 74
    // Finalidade -> teste dinâmico de contexto obrigatório, sem parar execução em caso de falha
    context('Required fields', function() { 

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })
    
        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })            
        })
    })

    // it('Required fields', function() {
    //     signup.go()
    //     signup.submit()
    //     SignupPage.alertMessageShouldBe('É necessário informar o nome')
    //     SignupPage.alertMessageShouldBe('É necessário informar o CPF')
    //     SignupPage.alertMessageShouldBe('É necessário informar o email')
    //     SignupPage.alertMessageShouldBe('É necessário informar o CEP')
    //     SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
    //     SignupPage.alertMessageShouldBe('Selecione o método de entrega')
    //     SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')        
    // })
})
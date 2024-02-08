import Fixture from "../fixtures/assets"
import App from "../pages/app"


describe('Keys', () => {
    
    beforeEach(()=>{
        Fixture.clean()
    })
    
    it('can login', () => {
        App.login()
        
        cy.get('[class="user"]').contains('test')
    })

    it('can logout', () => {
        App.login()

        App.logout()

        cy.get('[class="user"]').should('not.exist')
    })
    
})
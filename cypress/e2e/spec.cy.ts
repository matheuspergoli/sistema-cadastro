describe('My first test', () => {
	it('Should pass the login', () => {
		cy.visit('http://localhost:3000')

		cy.get('a').contains('Já possui uma conta? Faça login').click()

		cy.url().should('include', '/login')

		cy.get('[name="email"]').type('matheus@email.com')
		cy.get('[name="email"]').should('have.value', 'matheus@email.com')

		cy.get('[name="password"]').type('123456')
		cy.get('[name="password"]').should('have.value', '123456')

		cy.get('button').contains('Entrar').click()

		cy.url().should('include', '/dashboard')

		cy.get('h1').contains('Dashboard')
	})
})

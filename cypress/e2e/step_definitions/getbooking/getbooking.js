        
import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const baseUrl = 'https://restful-booker.herokuapp.com'

const checkin = '2022-01-01'
const checkout = '2024-06-17'

Given('que o usuário insere os dados na requisição pra buscar reservas', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/booking`,
    qs: { checkin, checkout }
  }).then((response) => {
    cy.logRequestResponse('GET', `${baseUrl}/booking`, { checkin, checkout }, response)
    
    expect(response.status).to.eq(200)
      
    if (!Array.isArray(response.body)) {
      throw new Error('A resposta não é uma lista de IDs de reservas')
    }

    cy.wrap(response.body).as('booking')
  })  
  
})

Then('deve exibir lista de reservas válidas', () => { 
  cy.get('@booking').then((bookings) => {
    bookings.forEach((booking) => {
      const bookingId = booking.bookingid || booking.id || booking
      cy.request(`${baseUrl}/booking/${bookingId}`).then((bookingResponse) => {
        const { checkin: actualCheckin, checkout: actualCheckout } = bookingResponse.body.bookingdates;

        cy.log(`Booking ID: ${bookingId}`)
        cy.log(`Check-in atual: ${actualCheckin}`)
        cy.log(`Check-out atual: ${actualCheckout}`)

        const actualCheckinDate = new Date(actualCheckin)
        const actualCheckoutDate = new Date(actualCheckout)
        const expectedCheckinDate = new Date(checkin)
        const expectedCheckoutDate = new Date(checkout)
        
        expect(actualCheckinDate).to.be.gte(expectedCheckinDate)
        expect(actualCheckoutDate).to.be.lte(expectedCheckoutDate)

        cy.log(JSON.stringify(bookingResponse.body))
      })
    })
  })
})
  
    
  

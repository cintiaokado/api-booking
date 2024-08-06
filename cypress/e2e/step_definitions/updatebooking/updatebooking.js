import{ Given, Then } from 'cypress-cucumber-preprocessor/steps'

const baseUrl = 'https://restful-booker.herokuapp.com'
const bookingId = 30

const newCheckinDate = "2024-08-01"
const newCheckoutDate = "2024-09-15"
     
Given('que o usuário realiza a busca de um livro pelo ID para atualizar a reserva', () => {
    
  cy.getToken()

  cy.get('@token').then((token) => {
    
    cy.request({
      method: 'GET',
      url: `${baseUrl}/booking/${bookingId}`,
      headers: {
        'Accept': 'application/json'
    }
    }).then((response) => {
      cy.log('Dados atuais da reserva:', JSON.stringify(response.body))

      expect(response.status).to.eq(200)

      cy.wrap(response.body).as('currentBooking')

      const updatedBooking = {
        firstname: response.body.firstname,
        lastname: response.body.lastname,
        totalprice: response.body.totalprice,
        depositpaid: response.body.depositpaid,
        bookingdates: {
          checkin: newCheckinDate,
          checkout: newCheckoutDate
        },
        additionalneeds: response.body.additionalneeds
      }

      cy.request({
        method: 'PUT',
        url:`${baseUrl}/booking/${bookingId}`,
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${token}`
        },
        body: updatedBooking
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.firstname).to.eq(updatedBooking.firstname)
        expect(response.body.lastname).to.eq(updatedBooking.lastname)
        expect(response.body.totalprice).to.eq(updatedBooking.totalprice)
        expect(response.body.depositpaid).to.eq(updatedBooking.depositpaid)
        expect(response.body.bookingdates.checkin).to.eq(updatedBooking.bookingdates.checkin)
        expect(response.body.bookingdates.checkout).to.eq(updatedBooking.bookingdates.checkout)
        expect(response.body.additionalneeds).to.eq(updatedBooking.additionalneeds)

        cy.wrap(bookingId).as('updatedBookingId')
      })
    })   
  })
})

Then('deve verificar se a atualização foi feita com sucesso', () => {
    
    cy.get('@updatedBookingId').then((bookingId) => {
    
      cy.request({
        method: 'GET',
        url: `${baseUrl}/booking/${bookingId}`,
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        
        expect(response.status).to.eq(200)
          
        expect(response.body.firstname).to.eq("Jake")
        expect(response.body.lastname).to.eq("Smith")
        expect(response.body.totalprice).to.eq(111)
        expect(response.body.depositpaid).to.eq(true)
        expect(response.body.bookingdates.checkin).to.eq(newCheckinDate)
        expect(response.body.bookingdates.checkout).to.eq(newCheckoutDate)
        expect(response.body.additionalneeds).to.eq("Breakfast")
          
        cy.log('Dados atualizados da reserva:', JSON.stringify(response.body))
      });
    });
  });
  
const url = 'https://reqres.in/api'


function getSingleUser(queryParam = []) {
    cy.request({
        method: 'GET',
        failOnStatusCode: false,
        url: `${url}/users/${queryParam.join('&')}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }).as('response1')
}

function registerUser(object) {
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: `${url}/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: object
    }).as('response2')
}

function loginUser(object) {
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: `${url}/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: object
    }).as('response3')
}

module.exports = { getSingleUser, registerUser, loginUser }
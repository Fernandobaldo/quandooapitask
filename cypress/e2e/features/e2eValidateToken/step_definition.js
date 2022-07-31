import {
    Given,
    When,
    And,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

const { getSingleUser, registerUser, loginUser } = require('../../../support/page_object/get-users-page');
const { LoginUserBean } = require('../../../support/dto/LoginUserBean');
const { RegisterUserBean } = require('../../../support/dto/RegisterUserBean');


Given('GET single user Id', function async(table) {
    cy.log('arguments', table);
    const { userId } = table.rowsHash();
    const queryParam = [];
    if (userId) {
        if (userId === userId)
            queryParam.push(`${userId}`);
    }
    getSingleUser.call(this, queryParam);
})


When('register new user', function async(table) {
    cy.get('@response1', { log: false }).then((response) => {
        const body = response.body;
        const userEmail = body.data.email
        cy.wrap(userEmail, { log: true }).as('userEmail');

        const data = table.rowsHash();
        const { email, password } = data

        const registerNewUser = new RegisterUserBean()

            .setEmail(email || this.email)
            .setPassword(password || this.password)

        if (email === 'true') {
            registerNewUser.setEmail(userEmail);
        } else {
            registerNewUser.setEmail(email);
        }

        if (password) {
            registerNewUser.setPassword(password);
        }

        registerUser.call(this, registerNewUser);
        expect(response.status, 'statusCode').to.eq(200);
    })
})

Given('login user with user credentials', function async(table) {
    const data = table.rowsHash();
    cy.get('@response2', { log: false }).then((response) => {
        const { email, password } = data

        const loginNewUser = new LoginUserBean()

            .setEmail(email || this.email)
            .setPassword(password || this.password)

        if (email === 'true') {
            loginNewUser.setEmail(this.userEmail);
        } else {
            loginNewUser.setEmail(email);
        }

        if (password) {
            loginNewUser.setPassword(password);
        }

        loginUser.call(this, loginNewUser);
        const registerToken = response.body.token;
        cy.wrap(registerToken, { log: true }).as('registerToken');
        expect(response.status, 'statusCode').to.eq(200);
    })
})

And('the tokens should be equals', function async() {
    cy.get('@response3', { log: false }).then((response) => {
        const body = response.body;
        expect(body.token, 'token').to.eq(this.registerToken);
        expect(response.status, 'statusCode').to.eq(200);
    })
})


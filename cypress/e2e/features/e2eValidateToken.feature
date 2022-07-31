Feature: test 1
    # when the user set 'true' for email, its mean that should use the single user email
    Scenario: scenario 1
        Given GET single user Id
            | userId | 1 |
        When register new user
            | email    | true |
            | password | 1234 |
        Then login user with user credentials
            | email    | true |
            | password | 1234 |
        And the tokens should be equals
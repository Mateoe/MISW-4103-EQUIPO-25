Feature: Crear O

@user1 @web
Scenario: Creacion de tag en ghost
  Given I navigate to page "https://ghost-5ehz.onrender.com/ghost/#/signin"
  And I wait for 2 seconds
  When I enter email "test@test.com"
  And I wait for 1 seconds
  And I enter password "Test@test25"
  And I wait for 1 seconds
  And I click login
  And I wait for 3 seconds
  And I click on the Open Settings link
  And I wait for 1 seconds
  And I click on the New Offer link
  And I wait for 1 seconds
  And I enter offer name "Descuento Black Friday"
  And I wait for 1 seconds
  And I click on the Safe Offer link
  And I wait for 1 seconds
  And I click on the Publish Offer link
  And I wait for 1 seconds
  Then I validate that the offer was created "Descuento Black Friday"
  And I wait for 1 seconds
  And I sign out
  And I wait for 1 seconds
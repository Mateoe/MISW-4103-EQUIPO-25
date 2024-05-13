Feature: Crear Oferta

@user1 @web
Scenario: Creacion de orferta en ghost
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
  And I click on the New Tier link
  And I wait for 1 seconds
  And I enter tier name "Membresía Premium"
  And I wait for 1 seconds
  And I enter tier description "test-membership-description"
  And I wait for 1 seconds
  And I enter tier priceMonth "5"
  And I wait for 1 seconds
  And I enter tier priceAnual "50"
  And I wait for 1 seconds
  And I enter tier benefit "Obtén acceso a todo el contenido web"
  And I wait for 1 seconds
  And I click on the Safe Tier link
  And I wait for 1 seconds
  And I click on the Publish Tier link
  And I wait for 1 seconds
  And I validate that the tier was created "Membresía Premium"
  And I wait for 1 seconds
  And I sign out
  And I wait for 1 seconds
Feature: Crear un Post

@user1 @web
Scenario: Creacion de un post en ghost
  Given I navigate to page "https://ghost-5ehz.onrender.com/ghost/#/signin"
  And I wait for 2 seconds
  When I enter email "test@test.com"
  And I wait for 1 seconds
  And I enter password "Test@test25"
  And I wait for 1 seconds
  And I click login
  And I wait for 3 seconds
  I click on the New post link
  And I wait for 1 seconds
  And I enter post-title "Este es mi nuevo post"
  And I wait for 1 seconds
  And I click on the Publish Flow
  And I wait for 1 seconds
  And I click on the Final Review Flow
  And I wait for 10 seconds
  And I click on the Confirm Publish Flow
  And I wait for 1 seconds
  And I click on the Retun to Posts
  And I wait for 1 seconds
  And I click on the Open Posts
  Then I validate that the tag was created "Este es mi nuevo post"
  And I wait for 1 seconds
  And I sign out
  And I wait for 1 seconds
  
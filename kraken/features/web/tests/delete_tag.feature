Feature: Eliminar tag

@user1 @web
Scenario: Eliminación de tag en ghost
  Given I navigate to page "https://ghost-5ehz.onrender.com/ghost/#/signin"
  And I wait for 2 seconds
  When I enter email "test@test.com"
  And I wait for 1 seconds
  And I enter password "Test@test25"
  And I wait for 1 seconds
  And I click login
  And I wait for 3 seconds
  And I click on the Tags link
  And I wait for 1 seconds
  And I click on tag element with name "tag-name"
  And I wait for 1 seconds
  And I click delete tag
  And I wait for 1 seconds
  And I click confirm
  And I wait for 1 seconds
  Then I validate that the tag was deleted "tag-name"
  And I wait for 1 seconds
  And I wait for 1 seconds
  And I sign out
  And I wait for 1 seconds




Feature: Eliminar miembro

@user1 @web
Scenario: Eliminacion de miembro en ghost
  Given I navigate to page "https://ghost-5ehz.onrender.com/ghost/#/signin"
  And I wait for 2 seconds
  When I enter email "test@test.com"
  And I wait for 1 seconds
  And I enter password "Test@test25"
  And I wait for 1 seconds
  And I click login
  And I wait for 3 seconds
  And I click on the Members link
  And I wait for 1 seconds
  And I click on member with name "member-name"
  And I wait for 1 seconds
  And I click member settings
  And I wait for 1 seconds
  And I click delete member
  And I wait for 1 seconds
  And I click confirm
  And I wait for 1 seconds
  Then I validate that the member was deleted "member-nam"
  And I wait for 1 seconds
  And I sign out
  And I wait for 1 seconds

  
Feature: Gestión de perfil de usuario en Ghost

  Scenario: Editar el perfil de usuario
    Given I navigate to page "https://ghost-5ehz.onrender.com/ghost/#/signin"
    And I wait for 2 seconds
    Given I enter email "test@test.com"
    And I enter password "Test@test25"
    When I click login
    And I click on the Profile link
    And I edit profile-name "test1"
    And I save profile changes
    Then I validate that the profile name was updated "test1"
    And I sign out

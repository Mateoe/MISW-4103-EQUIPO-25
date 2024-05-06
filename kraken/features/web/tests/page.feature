Feature: Gestión de páginas en Ghost

  Scenario: Crear una nueva página
    Given I navigate to page "https://ghost-5ehz.onrender.com/ghost/#/signin"
    And I wait for 2 seconds
    Given I enter email "test@test.com"
    And I enter password "Test@test25"
    When I click login
    And I click on the Pages link
    And I click on the New page link
    And I enter page-title "Nueva Página Kraken"
    And I enter page-content "Contenido de prueba para la página creada con Kraken"
    And I click publish page
    Then I validate that the page was created "Nueva Página Kraken"
    And I sign out

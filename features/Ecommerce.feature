Feature: Ecommerce Validation

@regression
  Scenario: Placing the order
    Given Login to Ecommerce application with "mukuljain@gmail.com" and "Automation@123"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When validate details "mukuljain@gmail.com"
    And Select country "Indonesia" and place the order
    And Verify Order Confirmation
    Then Verify order in present in the orderHistory

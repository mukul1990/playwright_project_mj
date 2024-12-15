Feature: Error Validation

@validation
@foo
  Scenario Outline: Login Validation
    Given Login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed
    Examples:
    |username|password|
    |mukuljain@gmail.com|Automation@123|
    |rahulshettyacademy|learning|
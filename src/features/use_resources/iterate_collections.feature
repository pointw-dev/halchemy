Feature: Can iterate collections of HAL Resources
    A HAL resource may contain a field (other than _embedded) that is a collection of other
    HAL formatted objects.  With this feature you can iterate that collection as a list of HAL Resources,
    that is as an enriched dictionary/object with additional functionality.

    Scenario: Iterate an array of HAL formatted objects, each as a HAL resource
        Given a HAL resource that has a field which is an array of objects in HAL format
        When I iterate the items in that field's array
        Then each item is a HAL resource

    @skip
    Scenario: Handle incorrectly using the iterator on a non-existent field
        Given a HAL resource
        When I try to iterate as a collection a field in the resource that does not exist
        Then I get a meaningful error message

    @skip
    Scenario: Handle using the iterator on a field that is not an array
        Given a HAL resource with a field
        When I try to iterate as a collection a field that is not an array
        Then I get a meaningful error message

    @skip
    Scenario: Handle using the iterator on a field that is an array but not of HAL format objects
        Given a HAL resource that has a field which is an array, but not of HAL formatted objects
        When I try to iterate the items in that field's array
        Then I get a meaningful error message

Feature: Can iterate collections of HAL Resources
    A HAL resource may contain a field (other than _embedded) that is a collection of other
    HAL formatted objects.  With this feature you can iterate that collection as a list of HAL Resources,
    that is as a dictionary/object enriched with additional functionality.

    Scenario: Iterate a collection of HAL formatted objects, each as a HAL resource
        Given a HAL resource that has a field which is a collection of objects in HAL format
        When I iterate the items in that field's collection
        Then each item is a HAL resource

    Scenario: Handle incorrectly using the iterator on a non-existent field
        Given a HAL resource
        When I try to iterate as a collection a field in the resource that does not exist
        Then it throws an exception telling me that the field does not exist

    Scenario: Handle using the iterator on a field that is not a collection
        Given a HAL resource with a non-collection field
        When I try to iterate as a collection a field that is not a collection
        Then it throws an exception telling me that the field is not a collection

    Scenario: Handle using the iterator on a field that is a collection but not of HAL format objects
        Given a HAL resource that has a field which is a collection, but not of HAL formatted objects
        When I try to iterate the items in that field's collection
        Then it throws an exception telling me collection contains non-HAL formatted objects

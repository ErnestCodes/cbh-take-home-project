# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add a custom ID field to the Agents table

    - Acceptance Criteria:
        - A new field called "custom_id" has been added to the Agents table
        - The custom_id field can hold up to 256 characters
        - The custom_id field can be nullable
    - Time/Effort estimate: 2 hours
    - Implementation Details:
        - Update the Agents table in the database to add the custom_id field
        - Update the relevant database queries to ensure the custom_id is    returned as part of the result set for the Agents table

Ticket 2: Retrieve custom IDs when querying for Shifts

    - Acceptance Criteria:
        - The getShiftsByFacility function returns both the internal database id of each Agent and their custom id, if one exists
        - The custom id is returned as a new field in the result set called "agent_custom_id"
    - Time/Effort estimate: 2 hours
    - Implementation Details:
        - Update the getShiftsByFacility function to return the custom_id for each Agent
        - Update the relevant database queries to ensure the custom_id is returned as part of the result set for the Agents table

Ticket 3: Use custom IDs in report generation

    - Acceptance Criteria:
        - The generateReport function uses the custom id for each Agent instead of their internal database id when generating the report
        - If the custom id is not available, the internal database id is used instead
    - Time/Effort estimate: 4 hours
    - Implementation Details:
        - Update the generateReport function to use the custom id for each Agent in the report if it is available
        - Ensure that if the custom id is not available, the internal database id is used instead

Ticket 4: Add ability to update custom IDs for Agents

    - Acceptance Criteria:
        - A new function has been added that allows Facilities to update the custom id for each Agent
        - The function updates the custom_id field in the Agents table
    - Time/Effort estimate: 4 hours
    - Implementation Details:
        - Add a new function to update the custom_id field in the Agents table
        - Ensure that the new function is only accessible to the Facilities and is properly secured

Ticket 5: Add ability to retrieve custom IDs for Agents

    - Acceptance Criteria:
        - A new function has been added that returns the custom id for a given Agent
        - The function returns the custom_id field from the Agents table
    - Time/Effort estimate: 2 hours
    - Implementation Details:
        - Add a new function to retrieve the custom_id field from the Agents table for a given Agent
        - Ensure that the new function is only accessible to the Facilities and is properly secured

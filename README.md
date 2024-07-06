# Automated API testsuite using Playwright

## About

An automated API testsuite testing all the REST functions - GET, POST, PUT, PATH, DELETE

Additionaly two tools were used to create API collections - Postman and Bruno.

This project uses public Restful Booker API - https://restful-booker.herokuapp.com/

## Postman
Project includes an exported Postman collection file of each API call to Restful Booker.

Postman link - https://www.postman.com/

## Bruno
Additionally an export of Bruno collection was made. Each call is saved inside an .bru file which is easily accessible - and readable - through IDE.

Bruno link - https://www.usebruno.com/

## Automation
The main focus of the API automation is on validating server responses.

The calls from the Postman and Bruno collections were automated using Playwright's built in fixture - request. 
Each call validates the response status and additionaly in the case of a POST call, the response json object is validated as well.
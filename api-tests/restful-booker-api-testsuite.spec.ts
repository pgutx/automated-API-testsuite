import { test, expect } from '@playwright/test';
import { request } from 'http';

test.describe('Restful booker - API testsuite', async() =>{

    let authTokenValue;

    test.beforeAll('Authentication', async({ request }) => {
        
        const authToken = await request.post("https://restful-booker.herokuapp.com/auth", {

          data: {
            "username" : "admin",
            "password" : "password123"
          }

        });

        authTokenValue = (await authToken.json()).token;

    });

    test('GET all booking IDs', async({ request }) => {

        const getResponse = await request.get("/booking");

        console.log(await getResponse.json());

        expect(getResponse.ok()).toBeTruthy();

        expect(getResponse.status()).toBe(200);

    });

    test('GET booking ID - 2', async({ request }) => {

        const getResponse = await request.get("/booking/2");

        console.log(await getResponse.json());

        expect(getResponse.ok()).toBeTruthy();

        expect(getResponse.status()).toBe(200);

    });

    test('GET booking ID - filter - first name', async({ request }) => {

        const getResponse = await request.get("/booking?firstname=Susan");

        console.log(await getResponse.json());

        expect(getResponse.ok()).toBeTruthy();

        expect(getResponse.status()).toBe(200);

    });

    test('GET booking ID - filter - last name', async({ request }) => {

        const getResponse = await request.get("/booking", {
            params: {
                lastname: "Smith"
            }
        });

        console.log(await getResponse.json());

        expect(getResponse.ok()).toBeTruthy();

        expect(getResponse.status()).toBe(200);

    });

    test('POST booking', async({ request }) => {

        const postResponse = await request.post("/booking", {
            data: {
              firstname : "TestFirstName",
              lastname : "TestLastName",
              totalprice : 99,
              depositpaid : true,
              bookingdates : {
                checkin : "2024-01-01",
                checkout : "2024-02-01"
              },
              additionalneeds : "Dinner"
            }
        });

        const jsonResponse = await postResponse.json()

        console.log(jsonResponse);

        expect(postResponse.ok()).toBeTruthy();

        expect(postResponse.status()).toBe(200);

        expect(jsonResponse.booking).toMatchObject({
            firstname : "TestFirstName",
            lastname : "TestLastName",
            totalprice : 99,
            depositpaid : true,
            bookingdates : {
              checkin : "2024-01-01",
              checkout : "2024-02-01"
            },
            additionalneeds : "Dinner"
        })

    });

    test('PUT booking', async({ request }) => {

        const putResponse = await request.put('/booking/3', {
            headers: {
                Cookie: `token=${authTokenValue}`
            },
            data: {
              firstname : "TestFirstNamePut",
              lastname : "TestLastNamePut",
              totalprice : 200,
              depositpaid : true,
              bookingdates : {
                checkin : "2024-02-01",
                checkout : "2024-03-01"
              },
              additionalneeds : "Lunch"
            }
        })

        const jsonResponse = await putResponse.json();

        console.log(jsonResponse);

        expect(putResponse.ok()).toBeTruthy();

        expect(putResponse.status()).toBe(200);

    });

    test('PATCH booking', async({ request }) => {

        const patchResponse = await request.patch('/booking/10', {
            headers: {
                Cookie: `token=${authTokenValue}`
            },
            data: {
              firstname : "John",
              lastname : "Smith",
            }
        })

        const jsonResponse = await patchResponse.json();

        console.log(jsonResponse);

        expect(patchResponse.ok()).toBeTruthy();

        expect(patchResponse.status()).toBe(200);

    });

    test('DELETE booking', async({ request }) => {

        const deleteResponse = await request.delete('/booking/250', {
            headers: {
                Cookie: `token=${authTokenValue}`
            },
        })

        expect(deleteResponse.ok()).toBeTruthy();

        expect(deleteResponse.status()).toBe(201);

    });

});
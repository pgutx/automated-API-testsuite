import { test, expect } from '@playwright/test';

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

    test('GET booking ID - 1', async({ request }) => {

        const getResponse = await request.get("/booking/240");

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

});
const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test('Add a new pet', async ({ request, page }) => {

    const url = 'https://petstore.swagger.io/v2';
    const petData = {
        "id": 123,
        "category": {
            "id": 1,
            "name": "Dog"
        },
        "name": "Bruno",
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 1,
                "name": "MyDog"
            }
        ],
        "status": "available"
    };

    const response = await request.post(url + '/pet', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: petData,
    });

    // Check if the response is successful
    expect(response.ok()).toBeTruthy();

    // Parse the JSON response
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 123);
    expect(responseBody).toHaveProperty('name', 'Bruno');
    expect(responseBody).toHaveProperty('status', 'available');
});

test('Update a pet', async ({ request, page }) => {

    const url = 'https://petstore.swagger.io/v2';
    const petData = {
        "id": 123,
        "category": {
            "id": 1,
            "name": "Dog"
        },
        "name": "Marcelo",
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 1,
                "name": "MyNewDog"
            }
        ],
        "status": "available"
    };

    const response = await request.put(url + '/pet', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: petData,
    });

    // Check if the response is successful
    expect(response.ok()).toBeTruthy();

    // Parse the JSON response
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 123);
    expect(responseBody).toHaveProperty('name', 'Marcelo');
    expect(responseBody).toHaveProperty('status', 'available');
});

test('Get a pet', async ({ request, page }) => {

    const url = 'https://petstore.swagger.io/v2';
    const petId = '123';

    const response = await request.get(`${url}/pet/${petId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Check if the response is successful
    expect(response.ok()).toBeTruthy();

    // Parse the JSON response
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 123);
    expect(responseBody).toHaveProperty('name', 'Marcelo');
    expect(responseBody).toHaveProperty('status', 'available');
});
const { test, expect } = require('@playwright/test');
const dynamicId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

test('Add a new pet', async ({ request }) => {

    const url = 'https://petstore.swagger.io/v2';

    const petData = {
        "id": dynamicId,
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
    expect(responseBody).toHaveProperty('id', dynamicId);
    expect(responseBody).toHaveProperty('name', 'Bruno');
    expect(responseBody).toHaveProperty('status', 'available');
});

test('Update a pet', async ({ request }) => {

    const url = 'https://petstore.swagger.io/v2';
    const petData = {
        "id": dynamicId,
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
    expect(responseBody).toHaveProperty('id', dynamicId);
    expect(responseBody).toHaveProperty('name', 'Marcelo');
    expect(responseBody).toHaveProperty('status', 'available');
});

test('Delete the updated pet', async ({ request }) => {

    const url = 'https://petstore.swagger.io/v2';
    const petId = dynamicId;

    const response = await request.delete(`${url}/pet/${petId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Check if the response is successful
    expect(response.ok()).toBeTruthy();

    // Parse the JSON response
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('message', String(dynamicId));
});

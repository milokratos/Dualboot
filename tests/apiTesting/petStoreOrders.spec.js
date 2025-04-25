const { test, expect } = require('@playwright/test');

test('Create a new order', async ({ request }) => {
    const url = 'https://petstore.swagger.io/v2';

    const orderPayload = {
        id: 1,
        petId: 123,
        quantity: 2,
        shipDate: "2025-04-25T03:10:59.602Z",
        status: "placed",
        complete: true
    };

    const response = await request.post(`${url}/store/order`, {
        data: orderPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Assertions
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('petId', orderPayload.petId);
    expect(responseBody).toHaveProperty('status', 'placed');
    expect(responseBody).toHaveProperty('complete', true);
});

test('Get order by ID', async ({ request }) => {
    const url = 'https://petstore.swagger.io/v2';
    const orderId = 1;

    const response = await request.get(`${url}/store/order/${orderId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', orderId);
    expect(responseBody).toHaveProperty('petId');
    expect(responseBody).toHaveProperty('status');
});

test('Delete order by ID', async ({ request }) => {
    const url = 'https://petstore.swagger.io/v2';
    const orderId = 1;

    const response = await request.delete(`${url}/store/order/${orderId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Assert the response is successful
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    // Optional: Check if the message confirms deletion
    expect(responseBody).toHaveProperty('message', String(orderId));
});
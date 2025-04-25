const { test, expect } = require('@playwright/test');

test('Create a new user', async ({ request }) => {
    const url = 'https://petstore.swagger.io/v2';

    const newUser = {
        id: 1001,
        username: 'camilotirado',
        firstName: 'Camilo',
        lastName: 'Tirado',
        email: 'camilo.tirado@example.com',
        password: 'pass123',
        phone: '1234567890',
        userStatus: 1
    };

    const response = await request.post(`${url}/user`, {
        data: newUser,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Assertions
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('code');
});

test('Get user by Username', async ({ request }) => {
    const url = 'https://petstore.swagger.io/v2';
    const username = 'camilotirado';

    const response = await request.get(`${url}/user/${username}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('username', username);
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('email');
});

test('Delete user by Username', async ({ request }) => {
    const url = 'https://petstore.swagger.io/v2';
    const username = 'camilotirado';

    const response = await request.delete(`${url}/user/${username}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Assert the response is successful
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    // Optional: Check if the message confirms deletion
    expect(responseBody).toHaveProperty('message', String(username));
});
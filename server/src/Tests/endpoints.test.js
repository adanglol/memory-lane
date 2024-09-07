
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../Schemas/user');
const app = require('../index'); // Import app without starting the server

describe('Auth Endpoints', () => {
    let createdUsers = [];

    beforeAll(async () => {
        try {
            // Connect to MongoDB only in the test setup
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('MongoDB connected');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
        }
        });

    afterAll(async () => {
        try {
            // Clean up created users
            if (createdUsers.length > 0) {
            await User.deleteMany({
                _id: {
                $in: createdUsers,
                },
            });
            console.log('Created users deleted');
            }
            // Close MongoDB connection
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        } catch (err) {
            console.error('Error during cleanup:', err);
        }
        });

    describe('POST /register', () => {
        // test if we can register a user succcessfully with valid data
        test('It should register a new user successfully', async () => {

            const res = await request(app)
                .post('/register')
                .send({
                username: 'testuser1234',
                email: 'newuser@example.com',
                password: 'Password123!',
                });
        
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('User created successfully');
            // Store the created user's ID
            const user = await User.findOne({ email: 'newuser@example.com' });
            if (user) {
                createdUsers.push(user._id);
            } else {
                console.error('User not found after creation');
            }
        });
        
        test('It should not register a new user with existing email', async () => {
            const res = await request(app)
            .post('/register')
            .send({
                username:'john_doe',
                email:'usertester@example.com',
                password:'Aaron123!'
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Email already exists');
        });

        test('It should not register a new user with existing username', async () => {
            const res = await request(app)
            .post('/register')
            .send({
                username:'USERTESTER',
                email:'thetester@example.com',
                password:'Aaron123!'
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Username already exists');

        });
        test('It should not register a new user with invalid email', async () => {
            const res = await request(app)
            .post('/register')
            .send({
                username:'john_doe',
                email:'usertesterexample.com',
                password:'Aaron123!'
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Invalid email');

        });
        test('It should not register a new user with invalid password', async ()=>{
            const res = await request(app)
            .post('/register')
            .send({
                username:'john_doe',
                email:'thetester@example.com',
                password:'abcdefgh'
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Invalid password must have length least 8 char have one upper a number and a special char');

        });
        test('It should not register a new user with invalid username', async ()=>{
            const res = await request(app)
            .post('/register')
            .send({
                username:'john doe',
                email:'thetester@example.com',
                password:'Aaron123!'
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Invalid username');

        });

   
    }); // register endpoint description
    describe('POST /login',() =>{})
    describe('POST /entries',() =>{})
}); //authendpoints description

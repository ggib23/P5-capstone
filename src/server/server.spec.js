import { app } from './index'; // server index file
const supertest = require('supertest');
const { response } = require('express');
const request = supertest(app);


// before running test ensure server is not already running 
it('should return success', async done => {
    const response = await request.get('/all')

    expect(response.status).toBe(200);
    done();
})
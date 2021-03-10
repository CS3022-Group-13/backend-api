let server;
const request = require('supertest');

describe('api/user routes',() => {
    beforeEach(() => {server = require('../../src/main'); })
    afterEach(() => {server.close();});

    describe.skip('register user admin',() => {
        const data = {
            username : 'testadmin1',
            password : 'dasith1',
            firstName :'testadmin',
            lastName : 'ediri',
            email : 'testadmin1@gmail.com',
            telephone : '07728902257',
            userType : 'Administrator'
        }
        it('should register a admin when proper fields are given', async () => {
            const res = await request(server)
            .post('/api/user/register')
            .send(data);

            expect(res.status).toBe(200);
        
        });

    });

    describe('admin logging', () => {
        const data = {
            username : 'testadmin1',
            password : 'dasith1' 
        }
        it('should log the admin', async () => {
            const res = await request(server)
            .post('/api/user/login')
            .send(data);

            expect(res.status).toBe(200);

        });
    });

});
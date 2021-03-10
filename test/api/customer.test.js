let server;
const request = require('supertest');

describe.skip('api/customer routes',() => {
    //beforeEach(() => {server = require('../../src/main'); })
    //afterEach(() => {server.close();});

    describe('register customer',() => {
        const data = {
            username : 'dasith1235',
            password : 'dasith',
            firstName :'dasith',
            lastName : 'ediri',
            email : 'udasith123@gmail.com',
            telephone : '07728902258'
        }
        it('should register a customer when proper fields are given', async () => {
            const res = await request(server)
            .post('/api/customer/add-customer')
            .send(data);

            expect(res.status).toBe('200');
        
        });

    describe('get customer details', () => {
        it('')
    });
    });

    // describe('get/get-details', () =>{
    //     it('should return customer details according to the customer details given in the param',async () => {
    //         const res = await request(server).get('/api/customer/get-details/' + );
    //         expect(res.status).toBe('200 OK');
    //     });
    // });

});
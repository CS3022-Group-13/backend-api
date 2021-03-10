let server;
const request = require('supertest');

describe('api/customer routes',() => {
    beforeEach(() => {server = require('../../src/main'); })
    afterEach(() => {server.close();});

    describe('register customer',() => {
        it('should register a customer', async () => {
            const res = await request(server)
            .post('api/customer/add-customer')
            .send({
                username : 'dasith',
                password : 'dasith',
                firstName :'dasith',
                lastName : 'ediri',
                email : 'udasith@gmail.com',
                telephone : '0772890264'
            });
            expect(res.statusCode).toBe('200');
        
        });
    });

    // describe('get/get-details', () =>{
    //     it('should return customer details according to the customer details given in the param',async () => {
    //         const res = await request(server).get('/api/customer/get-details/' + );
    //         expect(res.status).toBe('200 OK');
    //     });
    // });

});
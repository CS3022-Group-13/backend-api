let server;
const request = require('supertest');

describe('api/customer routes',() => {
    beforeEach(() => {server = require('../../src/main'); })
    afterEach(() => {server.close();});

    describe('register customer',() => {
        const data = {
            username : 'dasith1235',
            password : 'dasith',
            firstName :'dasith',
            lastName : 'ediri',
            email : 'udasith123@gmail.com',
            telephone : '07728902258'
        }
        const Mangerdata = {
            username : 'testadmin1',
            password : 'dasith1' 
        }

        


        it('should register a customer when proper fields are given', async () => {
            const response = await request(server)
            .post('/api/user/login')
            .send(Mangerdata);
            const token = response.token;

            const res = await request(server)
            .post('/api/customer/add-customer')
            .set('Authorization', 'Bearer ' + token)
            .send(data);
            

            expect(res.status).toBe('200');
            expect(res.token).toBe(res.token);
        
        });


    });

    // describe('get/get-details', () =>{
    //     it('should return customer details according to the customer details given in the param',async () => {
    //         const res = await request(server).get('/api/customer/get-details/' + );
    //         expect(res.status).toBe('200 OK');
    //     });
    // });

});
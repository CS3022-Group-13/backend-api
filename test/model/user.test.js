const {UserAccountModel} = require("../../src/model/user/user_account")

describe('user models',() => {
    describe('findby_username',() => {
        it('should return user data according to the userName', async () => {
            //const [error, account] = await model.user.account.findBy_username('testadmin1');
            const [error, account] = await UserAccountModel.findBy_username('testadmin1');
            
            
            expect(account).toMatchObject({username: 'testadmin1'});
        });
    });
    
});
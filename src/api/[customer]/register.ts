import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {body, inspectBuilder} from "../../utils/inspect";



/**
 * :: STEP 1
 * validating fields
 */

const inspector = inspectBuilder(
    body('username').exists().withMessage("username is required"),
    body('password').exists().withMessage("password is required"),
    body('firstName').exists().withMessage("firstName is required"),
    body('lastName').exists().withMessage("lastName is required"),
    body('email').exists().withMessage("email is required"),
    body('telephone').exists().withMessage("telephone is required")
)

/**
 * :: STEP 2
 * Create a new customer
 * @param req body
 *      username
 *      password
 *      firstName
 *      lastName
 *      email
 *      telephone
 *  
 * @param res
 *  message
 */



const addCustomerDetails:Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const customerId = UUID();
    const {username, password} = req.body;
    const customerData = {
        customerId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.telephone,
        email: req.body.email 
    };

    // Sync model to database
    const error = await model.customer.account.createAccount(
        customerData,
        {
            customerId,
            username,
            password: await encrypt_password(password),
            status: true
        }
    );

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .data({
                customerId
            })
            .send();
        return;
    }

    if (error === model.ERR.DUPLICATE_ENTRY) {
        r.status.BAD_REQ()
            .message("Username or email is already taken")
            .send()
        return;
    }

    r.prebuild.ISE().send();
}

/**
 * Request Handler Chain
 */


export default [inspector, addCustomerDetails as EHandler]
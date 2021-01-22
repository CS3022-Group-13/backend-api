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
    body('telephone').exists().withMessage("telephone is required"),
    body('userType').exists().withMessage("userType is required")
        .custom((value) => Object.values(model.user.type).includes(value))
        .withMessage("Invalid user type")
)

/**
 * :: STEP 2
 * Create a new user
 * @param req body
 *      username
 *      password
 *      firstName
 *      lastName
 *      email
 *      telephone
 *      userType
 *
 * @param res
 *  message
 */
const addUserDetails: Handler = async (req, res) => {
    const {r} = res;

    // Setup Data
    const userId = UUID()
    const {username, password} = req.body;
    const userData = {
        userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        userType: req.body.userType
    };

    // Sync model to database
    const error = await model.user.account.createAccount_local(
        userData,
        {
            userId,
            username,
            password: await encrypt_password(password),
            verified: true
        }
    );

    if (error === model.ERR.NO_ERROR) {
        r.status.OK()
            .message("Success")
            .data({
                userId
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
};


/**
 * Request Handler Chain
 */
export default [inspector, addUserDetails as EHandler]

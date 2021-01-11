import {EHandler, Handler} from "../../utils/types";
import {v4 as UUID} from "uuid";
import {model} from "../../model";
import {encrypt_password} from "../../utils/hasher";
import {BRule, CHECK, InspectorBuilder} from "../../utils/inspector";

/**
 * :: STEP 1
 * Validate Request
 */
const inspectRequest = InspectorBuilder(
    [
        BRule("username")(
            CHECK.length(5, 10),
            {
                error: "Username must have 4 - 10 characters",
                required: true
            }
        ),
        BRule("password")(
            CHECK.password({
                minLength: 6,
            }),
            {
                error: "password is not strong enough. "
                + "It must be contained at least one "
                + "digit, symbol(other than @), lowercase character, uppercase character "
                + "and must be contained at least 6 characters",
                required: true
            }
        ),
        BRule("firstName")(
            CHECK.length(3, 20),
            {
                error: "firstName length should be 3 to 20 characters",
                required: true
            }
        ),
        BRule("lastName")(
            CHECK.length(3, 20),
            {
                error: "lastName length should be 3 to 20 characters",
                required: false
            }
        ),
        BRule("email")(
            CHECK.email(),
            {
                error: "Invalid email address",
                required: true
            }
        ),
        // BRule("telephone")(
        //     CHECK.telephone(),
        //     {
        //         error: "Invalid telephone address",
        //         required: false
        //     }
        // ),
        BRule("userType")(
            CHECK.length(0, 30),
            {
                error: "userType is required",
                required: true
            }
        )
    ]
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
    const error = await model.userAccount.createAccount_local(
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
export default [addUserDetails as EHandler]

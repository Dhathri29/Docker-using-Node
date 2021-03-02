const db = require("../config/db");
var bcrypt = require("bcryptjs");

//register-(get route)
const register = (req, res) => {
    res.render("register");
    console.log("get worked");
};

//add registered user-(post route)
const registeredUser = async (req, res) => {
    const { username, password } = req.body;

    var result = await db.query(
        `SELECT username FROM register WHERE username = '` + username + `'`
    );

    console.log(result.length);
    if (result.length) {
        console.log("----------------user exists------------");
        res.redirect("/register");
    } else {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);

        const hash = await bcrypt.hash(password, salt);
        console.log("hash :", hash);

        await db.query(
            `insert into register (username,password) values ('${username}','${hash}') `
        );
        res.redirect("/login");
    }
};

//loginPage- (get route)
const loginPage = (req, res) => {
    console.log("login get");
    res.render("login");
};

//loginCheck - (post route)

const loginCheck = async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);

    console.log("login post worked");

    const userDetails = await db.query(
        `select * from register where username= '${username}'`
    );
    console.log("userDetails:", userDetails);
    // console.log("username: ", username);
    console.log(userDetails.length);
    if (userDetails.length) {
        const validPassword = await bcrypt.compare(
            password,
            userDetails[0].password
        );
        //console.log(req.session);
        //req.session.user = username;
        //console.log(req.session.user);

        if (validPassword) {
            res.redirect("/home");
        } else {
            res.redirect("/login");
            console.log("not worked");
        }
    }
};

//get
const homepage = async (req, res) => {
    res.render("homepage");
};

//logout
const logout = (req, res) => {
    //session destroy
    req.session.user = null;
    req.session.destroy();
    res.redirect("/login");
};

module.exports = {
    homepage,
    register,
    registeredUser,
    loginPage,
    loginCheck,
    logout,
};

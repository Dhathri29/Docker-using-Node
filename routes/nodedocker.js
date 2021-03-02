const router = require("express").Router();

const { select } = require("async");
const { DH_NOT_SUITABLE_GENERATOR } = require("constants");

//import controller
const {
    homepage,
    register,
    registeredUser,
    loginPage,
    loginCheck,
    logout,
} = require("../controllers/nodedocker");

//routes for the pages
router.route("/register").get(register).post(registeredUser);
router.route("/login").get(loginPage).post(loginCheck);
router.get("/home", homepage);
router.route("/logout").get(logout);
router.get("/userProductsPage", loginCheck);

module.exports = router;

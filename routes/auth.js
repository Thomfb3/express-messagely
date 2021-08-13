const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");




const User = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/





/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async (req, res, next) => {
    try {

      const newUser = await User.register(req.body);

      return res.render("user_registered.html", { newUser } );

    } catch (e) {
      if (e.code === '23505') {
        return next(new ExpressError("Username taken. Please pick another!", 400));
      }
      return next(e)
    };
  });


 module.exports = router;

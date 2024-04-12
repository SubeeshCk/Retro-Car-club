const express = require("express");
const session = require("express-session");

const router = express.Router();

const users = [
  { email: "admin@gmail.com", password: "admin@123" },
  { email: "user1@gmail.com", password: "user1pass" },
  { email: "user2@gmail.com", password: "user2pass" },
];

//login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    req.session.user = user.email;
    res.status(200).redirect("/route/home");
  } else {
    res.status(400).render("base", {
      title: "Login",
      failMessage: "Invalid username or password",
    });
  }
});

//route home
router.get("/home", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  if (req.session.user) {
    res.render("home", { user: req.session.user, title: "Home" });
  } else {
    res.send("Unauthorised User");
  }
});

//route logout
router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Sorry,Something went wrong...");
    } else {
      res.render("base", {
        title: "Login",
        logoutMessage: "Log out succesfully",
      });
    }
  });
});

module.exports = router;

// //we can do this with cookie too

// // login route
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const user = users.find((u) => u.email === email && u.password === password);

//     if (user) {
//         res.cookie('user', user.email); // Set a cookie named 'user'
//         res.redirect('/route/home');
//     } else {
//         res.render('base', { title: 'Login', failMessage: 'Invalid username or password' });
//     }
// });

// // route home
// router.get('/home', (req, res) => {
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     const user = req.cookies.user;
//     if (user) {
//         res.render('home', { user: user, title: "Home" });
//     } else {
//         res.send("Unauthorized User");
//     }
// });

// // route logout
// router.get('/logout', (req, res) => {
//     res.clearCookie('user'); // Clear the 'user' cookie
//     res.render('base', { title: "Login", logoutMessage: "Logout successfully" });
// });

//const cookieParser = require('cookie-parser'); // Add this line in server.js
//app.use(cookieParser()); // Add this line in server.js
//and install cookie-parser

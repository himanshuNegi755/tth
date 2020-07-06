var passport = require('passport');

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

    
  app.get('/', (req, res) => res.redirect('http://localhost:3000'));
    
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
      //console.log(typeof(req.user));
      //res.send('this is user');
      res.send(req.user);
      
  });

  app.get("/auth/logout", (req, res) => {
    req.logout(); // req.logout is function that is attached to request by passport
    res.redirect('/');
  });
};
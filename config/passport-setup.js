var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
var keys = require('./keys');
// model
var User = require('../model/user');
var Cart = require('../model/cart');
var Order = require('../model/order');

passport.serializeUser((user, done) => {
    console.log('serializing user');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deserializing user'); 
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
 new GoogleStrategy({
   clientID: keys.google.clientID,
   clientSecret: keys.google.clientSecret,
   callbackURL: 'http://localhost:5000/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
     // check if user already exists in our db
     //console.log(profile);
     User.findOne({googleId: profile.id}).then((currentUser) => {
         if(currentUser) {
             // already have the user
             console.log('user is: ', currentUser);
             done(null, currentUser);
         } else {
             // if not, create user in our db
             new User({
                 userName: profile.displayName,
                 googleId: profile.id,
                 userEmail: profile.emails[0].value,
                 userImage: profile._json.picture
          }).save().then((newUser) => {
                 console.log('new user created: ' + newUser);
                 
                 new Cart({
                   title: newUser.userEmail  
                 }).save().then((newCart) => {
                    console.log('Cart created for new user')
                 })

                 new Order({
                   title: newUser.userEmail  
                 }).save().then((newOrder) => {
                    console.log('Order List created for new user')
                 })
                 
                 done(null, newUser);
              });
         }
     });
    }
));
var express = require('express');
var cors = require('cors')
var cookieSession = require('cookie-session');

const whitelist = ['http://localhost:3000', 'http://localhost:5000'];
const corsOptions = {
  credentials: true,
  origin: true
  /*origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }*/
}


//var authRoutes = require('./routes/auth-routes');
//var profileRoutes = require('./routes/profile-routes');

require('./config/passport-setup');

const PORT = process.env.PORT || 5000;

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var keys = require('./config/keys');
var passport = require('passport');

var twilio = require('twilio')(keys.twilio.accountSID, keys.twilio.authToken)

// models
var Product = require('./model/product');
var Cart = require('./model/cart');
var User = require('./model/user');
var Order = require('./model/order');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOptions));

const {ObjectId} = require('mongodb');
//const {ISODate} = require('mongodb');

app.use(cookieSession({
    name: 'login',
    maxAge: 60*60*1000,  // 7*24* add later after completion of site
    keys: [keys.session.cookieKey]
}));

// initkialize passport
/*app.use(function(req, res,next) {
    console.log(`before auth: req.login : ${req.cookies} , req.user : ${Boolean(req.user)}`);
    next();
})*/

app.use(passport.initialize());
app.use(passport.session());

/*app.use(function(req, res, next) {
    console.log(`After auth: req.login : ${req.cookies} , req.user : ${Boolean(req.user)}`);
    next();
})*/
// set up routes
//app.use('/auth', authRoutes);
//app.use('http://localhost:3000', profileRoutes);
//app.use('/profile', profileRoutes);

var db = mongoose.connect('mongodb://localhost/theka-to-home')

require("./routes/auth-routes")(app);

//twilio request
app.get('/phoneNo/:data', (req, res) => {
    if (req.params.data) {
    twilio
        .verify
        .services(keys.twilio.serviceID)
        .verifications
        .create({
            to: `+91${req.params.data}`,
            channel: 'sms'
        })
        .then((data) => {
            res.status(200).send({
                message: 'Verification code has been sent to given number',
                data
            })
        })
    } else {
        res.status(400).send({
            message: "Wrong phone number :(",
            data
        })
    }
});

app.get('/verify', (req, res) => {
    if (req.query.phoneNo && (req.query.code).length === 4) {
        twilio
            .verify
            .services(keys.twilio.serviceID)
            .verificationChecks
            .create({
                to: `+91${req.query.phoneNo}`,
                code: req.query.code
            })
            .then((data) => {
                if (data.valid) {

                    User.updateOne({_id: ObjectId(req.query.userId)}, {$set: {userPhoneNo: {value: req.query.phoneNo, verified: true}}}, function(err, user) {
                    if (err) {
                        res.status(500).send({error: "Could not add item to cart"});
                    } else {
                        res.status(200).send({
                            status: 'user phoneNo saved',
                            message: 'Verification Successful',
                            data
                        });
                      }
                    });
                } else {

                    res.status(200).send({
                        message: 'Wrong otp',
                        data
                    })

                }

            })
    } else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            data
        })
    }
});


// api methods
app.post('/product', function(request, response) {
    var product = new Product();
    product.productName = request.body.productName;
    product.productType = request.body.productType;
    product.productSize = request.body.productSize;
    product.productPrice = request.body.productPrice;
    product.productImgUrl = request.body.productImgUrl;
    product.save(function(err, savedProduct) {
        if (err) {
            response.status(500).send({error:"Could not save product"});
        } else {
            response.send(savedProduct);
        }
    });
});

/*app.post('/new-user', function(request, response) {
    var user = new User();
    user.userName = request.body.userName;
    user.userEmail = request.body.userEmail;
    user.userPassword = request.body.userPassword;
    user.save(function(err, savedUser) {
        if (err) {
            response.status(500).send({error:"Could not save user"});
        } else {
            response.send(savedUser);
            console.log('the user created - ' ,savedUser)
        }
    });
});*/

app.put('/cart/product/delete/', function(request, response) {
    Cart.updateOne({title: request.body.title}, {$pull : {"products": {$in : [ObjectId(request.body.productId)]}}}, function(err, cart) {
        if (err) {
            response.status(500).send({error: "Could not find the cart"});
        } else {
            /*Cart.find({}).populate({path: 'products', model: 'Product'}).exec(function(err, carts) {
            if(err) {
                response.status(500).send({error: "No wishList"});
            } else {
                response.send(carts);
            }
    });*/

            response.send(cart);

        }
    })
});

app.put('/cart/product/empty-all/', function(request, response) {
    Cart.updateOne({title: request.body.title}, {$set : {"products": []}}, function(err, cart) {
        if (err) {
            response.status(500).send({error: "Could not find the cart"});
        } else {
            response.send(cart);
        }
    })
});

/*app.get('/product', function(request, response) {
   Product.find({}, function(err, products) {
        if(err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(products);
        }
    }); 
});*/

app.get('/product/product-details/:data', function(request, response) {
   Product.find({_id: ObjectId(request.params.data)}, function(err, products) {
       if(err) {
           response.status(500).send({error: "Could not fetch products"});
       } else {
           response.send(products);
           //console.log(products);
       }
   }); 
});

app.get('/product/product-id-from-name/:data', function(request, response) {
   Product.find({productName: request.params.data}, {_id:1}).exec(function(err, products) {
       if(err) {
           response.status(500).send({error: "Could not fetch products"});
       } else {
           response.send(products);
           //console.log(products);
       }
   }); 
});

app.get('/product/for-autoComplete', function(request, response) {
    Product.find({}, {productName:1, _id:0}).exec(function(err, productsNameList) {
       if(err) {
           response.status(500).send({error: "Could not fetch productsName"});
       } else {
           response.send(productsNameList);
       }
    });
});

app.get('/product/productType/:data', function(request, response) {
    if ( request.params.data != 'Sprites') {
        Product.find({productType: request.params.data}, function(err, products) {
            if(err) {
                response.status(500).send({error: "Could not fetch products"});
            } else {
                response.send(products);
            }
        });
    } else {
        Product.find({productType: {$in: ['Tequila', 'Whisky', 'Vodka']}}, function(err, products) {
            if(err) {
                response.status(500).send({error: "Could not fetch products"});
            } else {
                response.send(products);
            }
        });
    }
});

app.get('/product/order/desc/productType/:data', function(request, response) {
    if ( request.params.data != 'Sprites') {
        Product.find({productType: request.params.data}).sort({'productPrice': -1}).exec(function(err, products) {
            if(err) {
                response.status(500).send({error: "Could not fetch products"});
            } else {
                response.send(products);
            }
        });
    } else {
        Product.find({productType: {$in: ['Tequila', 'Whisky', 'Vodka']}}).sort({'productPrice': -1}).exec(function(err, products) {
            if(err) {
                response.status(500).send({error: "Could not fetch products"});
            } else {
                response.send(products);
            }
        });
    }
});

app.get('/product/order/asce/productType/:data', function(request, response) {
    if ( request.params.data != 'Sprites') {
        Product.find({productType: request.params.data}).sort({'productPrice': 1}).exec(function(err, products) {
            if(err) {
                response.status(500).send({error: "Could not fetch products"});
            } else {
                response.send(products);
            }
        });
    } else {
        Product.find({productType: {$in: ['Tequila', 'Whisky', 'Vodka']}}).sort({'productPrice': 1}).exec(function(err, products) {
            if(err) {
                response.status(500).send({error: "Could not fetch products"});
            } else {
                response.send(products);
            }
        });
    }
});

/*app.post('/cart', function(request, response) {
    var cart = new Cart();
    cart.title = request.body.title;
    
    cart.save(function(err, newCart) {
        if(err) {
            response.status(500).send({error: "Could not create wishlist"});
        } else {
            response.send(newCart);
        }
    })
});*/

app.get('/cart/:data', function(request, response) {
    Cart.find({title: request.params.data}).populate({path: 'products', model: 'Product'}).exec(function(err, carts) {
        if(err) {
            response.status(500).send({error: "No wishList"});
        } else {
            response.send(carts);
        }
    });
});

app.get('/order/:data', function(request, response) {
    Order.find({title: request.params.data}, {_id:0, orders: 1}).exec(function(err, orders) {
        if(err) {
            response.status(500).send({error: "No Order List"});
        } else {
            response.send(orders);
        }
    });
});

app.put('/cart/product/add', function(request, response) {
    Product.findOne({_id: request.body.productId}, function(err, product) {
        if (err) {
            response.status(500).send({error: "Could not add item to cart"});
        } else {
            //if(product.productPrice) {
            Cart.updateOne({title:request.body.title}, {$addToSet: {products: product._id}}, function(err, cart) {
                if (err) {
                    response.status(500).send({error: "Could not add item to cart"});
                } else {
                    response.send(cart);
                }
            });
        /*} else {
            Cart.updateOne({title:request.body.title}, {$addToSet: {products: product._id}}, function(err, cart) {
                if (err) {
                    response.status(500).send({error: "Could not add item to cart"});
                } else {
                    response.send(cart);
                }
            });
        }*/
        }
    });
});


app.put('/order/add', function(request, response) {
    //Order.updateOne({title:request.body.title}, {$push: {orders: {order: ObjectId({$each: request.body.order}), dateAndTime: new Date(), totalAmount: request.body.totalAmount}}}, function(err, order) {
    Order.updateOne({title:request.body.title}, {$push: {orders: {order: request.body.order, dateAndTime: new Date(), totalAmount: request.body.totalAmount}}}, function(err, order) {
        if (err) {
            response.status(500).send({error: "Could not complete the order"});
        } else {
            response.send(order); 
        }
    });
});


// listining for port
app.listen(PORT, function() {
    console.log("ThekaToHome API running on port " + PORT + "....");
});
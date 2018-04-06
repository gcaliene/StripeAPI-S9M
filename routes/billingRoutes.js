const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

//No user login required
// const requireLogin = require('../middlewares/requireLogin'); 

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //any amount of middlewares is possible as long as the final argument is sending off to whoever made the request
    //console.log(req.body); this tests the body parser middleware
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    //console.log(req.user); //passport.js puts the username into the req.user
    // console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user); //respond to a req by using res.send to communicate back to the browser
  });
};
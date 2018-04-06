exports.DATABASE_URL =
process.env.MONGODB_URI ||
global.MONGO_URI ||
'mongodb://localhost/StripeAPIDB';

exports.PORT = process.env.PORT || 8080;
// const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb+srv://dbUser:codesmith@cluster0.rnhbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'soloProject',
// })
//   .then(() => console.log('Connected to Mongo DB.'))
//   .catch((err) => console.log(err));

// const { Schema } = mongoose;

// const userSchema = new Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   favorites: [{ name: String }],
// });

// userSchema.pre('save', function (next) {
//   bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
//     if (err) return next(err);
//     this.password = hash;
//     return next();
//   });
// });

// const Users = mongoose.model('users', userSchema);

// const subwaySchema = new Schema({
//   subwayStop: String,
//   stop_name: String,
//   stop_lat: Number,
//   stop_lon: Number,
//   Lines: String,
// });

// const Subways = mongoose.model('subways', subwaySchema);

// // exports all the models in an object to be used in the controller
// module.exports = {
//   Users,
//   Subways,
// };

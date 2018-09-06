var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var moment = require('moment')

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    sectorOfInterest: String,
    linkedInProfile: String
  },
  created_at: String,
  updated_at: String,
});

const hashPassword = (rawPassword) => crypto.createHash('md5').update(rawPassword).digest('hex');

userSchema.methods.promoteToAdmin = () => {
    this.admin = true; 
    return this.admin;
};

userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = moment().format('LLLL');
  
    // change the updated_at field to current date
    try {
        console.log(currentDate)
        this.updated_at = currentDate;
  
        // if created_at doesn't exist, add to that field, and hash password
        console.log(moment(this.created_at))
        /* if (moment(this.created_at) === currentDate) {
            this.created_at = currentDate;
            this.password = hashPassword(this.password)
        } */
    
        next();
    } catch (err) {
        console.log(err)
    }
});
    
var User = mongoose.model('User', userSchema);

module.exports = User;
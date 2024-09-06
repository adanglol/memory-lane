
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Define the schema for the user collection
const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

// Define a pre-save hook to hash the password before saving it to the database
userSchema.pre('save',async function(next){
    // Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define a method to compare the hashed password with the password provided by the user
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
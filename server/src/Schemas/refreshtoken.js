
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RefreshTokenSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    token : {type: String, required: true},
    expiryDate : {type: Date, required: true}

});

RefreshTokenSchema.methods.isExpired = function(){
    return Date.now() >= this.expiryDate;
};

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshToken;
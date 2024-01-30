const ShortUniqueId= require('short-unique-id');
const jwt = require('jsonwebtoken');
exports.generateShortUuid = () => {
    const uid = new ShortUniqueId({ length: 8, dictionary: "hex" });  
    return uid.rnd(); 
};

exports.generateAuthToken= function(user){
    console.log(user)
const token = jwt.sign({userId:user._id,email:user.email},process.env.SECRET_KEY,{
    expiresIn:'5m',
})
return token
}

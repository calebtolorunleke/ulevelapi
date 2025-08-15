const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: { type: String, required: [true, 'Please provide a name'] },
    email: { type: String, required: [true, 'Please provide an email'], unique: true, validate: [isEmail, 'Please provide a valid email address'] },
    password: { type: String, required: [true, 'Please provide a password'], minlength: [7, 'The minimum password length is 7'] }

}, { timestamps: true })
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function (userPassword) {
    const isCorrect = await bcrypt.compare(userPassword, this.password)
    return isCorrect
}


//generate token
userSchema.methods.generateToken = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.jwt_secret,
        { expiresIn: '1d' })
}

module.exports = mongoose.model('User', userSchema)
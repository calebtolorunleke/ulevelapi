const User = require('../model/auth')
const handleError = require('../utils/handleerror')

const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ succcess: true, user })
    } catch (error) {
        const errors = handleError
        res.status(400).json(errors)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body


    if (!email || !password) {
        return res.status(400).json({ succcess: false, message: "Please provide necessary information" })
    }


    try {

        const userExist = await User.findOne({ email })
        if (!userExist) {
            // return res.status(400).json({ succcess: false, message: "Email has not been registered" })
            throw Error('Incorrect email')
        }

        const authenticated = await userExist.comparePassword(password)
        if (!authenticated) {
            // return res.status(400).json({ succcess: false, message: "email or password is incorrect" })
            throw Error('Incorrect password')
        }
        //generate token (token base authentication )

        const token = userExist.generateToken()

        res.status(200).json({ succcess: true, user: { userExist: userExist.name, email: userExist.email }, token })
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({ errors })
    }
}


module.exports = { register, login }
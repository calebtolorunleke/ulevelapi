//err.message err.code

const handleError = (err) => {
    let errors = { name: '', email: '', password: '' }
    if (err.code === 11000) {
        errors.email = 'Email is already in use'
        return errors;
    }

    if (err.message === 'Incorrect email') {
        errors.email = 'This email has not been registered'
    }

    if (err.message === 'Incorrect password') {
        errors.email = 'Email or password is incorrect'
        errors.password = 'Email or password is incorrect'
        return errors
    }

    if (err.message.include('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports = handleError

module.exports.checkPasswordValidation = (value) => {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        // return "Password must not contain Whitespaces.";
        return 'Password must have at least 6 Characters. Also should have Uppercase, Lowercase Characters, Number ,and Special characters'
    }


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
        // return "Password must have at least one Uppercase Character.";
        return 'Password must have at least 6 Characters. Also should have Uppercase, Lowercase Characters, Number ,and Special characters'
    }


    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
        // return "Password must have at least one Lowercase Character.";
        return 'Password must have at least 6 Characters. Also should have Uppercase, Lowercase Characters, Number ,and Special characters'
    }


    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
        // return "Password must contain at least one Digit.";
        return 'Password must have at least 6 Characters. Also should have Uppercase, Lowercase Characters, Number ,and Special characters'
    }


    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
        // return "Password must contain at least one Special Symbol.";
        return 'Password must have at least 6 Characters. Also should have Uppercase, Lowercase Characters, Number ,and Special characters'
    }


    const isValidLength = /^.{6,20}$/;
    if (!isValidLength.test(value)) {
        // return "Password must be 6-20 Characters Long.";
        return 'Password must have at least 6 Characters. Also should have Uppercase, Lowercase Characters, Number ,and Special characters'
    }
    return null;
}


// here is combination of above
// let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,10}$/;

// console.log(regex.test('Lalitqq'))
import joi from 'joi';

const schemaValidateSignUp = joi.object({    
    email: joi.string().trim().email().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

export default schemaValidateSignUp;
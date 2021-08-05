import joi from 'joi';

const schemaValidateSignIn = joi.object({    
    email: joi.string().trim().email().required(),
    password: joi.string().min(3).required(),    
});

export default schemaValidateSignIn;
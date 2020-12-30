//VALIDATION
const Joi = require('@hapi/joi');


const registerValidation = data => {
   const schema = Joi.object({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
   })

   return schema.validate(data);
}

const loginValidation = data => {
   const schema = Joi.object({
      name: Joi.string().min(6).required(),
      password: Joi.string().min(6).required()
   })

   return schema.validate(data);
}

const updateValidation = data => {
   const schema = Joi.object({
      name: Joi.string().min(6).required(),
      password: Joi.string().min(6),
      email: Joi.string().min(6).email().required(),
      extra: Joi.string(),
      fullname: Joi.string().min(6)
   })

   return schema.validate(data);
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
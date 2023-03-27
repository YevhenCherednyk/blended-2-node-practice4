const Joi = require("joi");

const rejisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const registerValidation = (req, res, next) => {
  const { error } = rejisterSchema.validate(req.body);

  if (error) {
    const field = error.details[0].context.key;

    res
      .status(400)
      .json({ message: `missing required ${field} field or not valid` });

    return;
  }
  next();
};

module.exports = {
  registerValidation,
};

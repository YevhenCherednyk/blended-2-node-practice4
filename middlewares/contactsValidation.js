const Joi = require("joi");

const contactPostSchema = Joi.object({
  name: Joi.string().min(1).required(),
  number: Joi.number().required(),
});

// const bookUpdateSchema = Joi.object({
//   title: Joi.string().min(1).max(100),
//   author: Joi.string().min(1),
//   image: Joi.string().min(10),
//   plot: Joi.string().min(1).max(10000),
//   isRead: Joi.boolean(),
// });

// const bookPatchSchema = Joi.object({
//   isRead: Joi.boolean().required(),
// });

const contactValidation = (req, res, next) => {
  const { error } = contactPostSchema.validate(req.body);

  if (error) {
    const field = error.details[0].context.key;
    res
      .status(400)
      .json({ message: `missing required ${field} field or not valid` });
    return;
  }
  next();
};

// const putValidation = (req, res, next) => {
//   if (!Object.keys(req.body).length) {
//     res.status(400).json({ message: "Missing fields" });
//     return;
//   }
//   const { error } = bookUpdateSchema.validate(req.body);

//   if (error) {
//     const field = error.details[0].context.key;

//     res.status(400).json({ message: `${field} field is not valid` });
//     return;
//   }
//   next();
// };

// const patchValidation = (req, res, next) => {
//   if (!req.body["isRead"]) {
//     res.status(400).json({ message: "Missing isRead field" });
//     return;
//   }

//   const { error } = bookPatchSchema.validate(req.body);

//   if (error) {
//     res.status(400).json({ message: "isRead field has not correct type" });
//     return;
//   }
//   next();
// };

module.exports = {
  contactValidation,
};

import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(4).required(),
    Description: Joi.string().min(4).required(),
    color: Joi.string(),
    Trash: Boolean

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: '${error}'
  });
 }
  else {
  
    next();
  }
};
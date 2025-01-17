import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
// валідація ID
export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id) === false) {
    return next(createHttpError(400, 'ID is not valid'));
  }
  next();
};

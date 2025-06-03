import HttpError from './http-error.error';
import HttpStatus from './http-status';

export default class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

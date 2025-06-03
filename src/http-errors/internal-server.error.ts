import HttpError from './http-error.error';
import HttpStatus from './http-status';

export default class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

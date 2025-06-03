import HttpError from './http-error.error';
import HttpStatus from './http-status';

export default class NotFound extends HttpError {
  constructor(message = 'Not Found') {
    super(HttpStatus.NOT_FOUND, message);
  }
}

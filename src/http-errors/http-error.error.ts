import HttpStatus from './http-status';

const statusMessages: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

export default class HttpError extends Error {
  status: number;

  expose: boolean;

  constructor(status: HttpStatus, message?: string) {
    super(message || HttpError.getStatusText(status));
    this.name = this.constructor.name;
    this.status = status;
    this.expose =
      status >= HttpStatus.BAD_REQUEST &&
      status < HttpStatus.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static getStatusText(status: number): string {
    return statusMessages[status] || 'Error';
  }
}

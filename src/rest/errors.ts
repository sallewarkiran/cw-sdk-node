import { Response } from 'superagent';

interface RestErrrorProps extends Error {
  message: string;
  response: Response;
  status: number;
}

export class RestError extends Error {
  public response: Response;
  public status: number;

  constructor(error: RestErrrorProps) {
    super(error.response.body.error || error.message);
    this.response = error.response;
    this.status = error.status;
  }
}

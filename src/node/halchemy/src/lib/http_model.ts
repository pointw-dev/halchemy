import {CaseInsensitiveHeaders} from "./case_insensitive_headers";

export class Request {
  constructor(
      public method: string,
      public url: string | undefined,
      public headers: CaseInsensitiveHeaders,
      public body?: string
  ) {}
}


export class Response {
  constructor(
      public statusCode: number,
      public reason: string,
      public headers: CaseInsensitiveHeaders,
      public body: string
  ) {}
}

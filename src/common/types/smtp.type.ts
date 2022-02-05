export interface SMTPConnectionOptions {
  host: string;
  port: number | string;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}

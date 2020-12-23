import {once} from 'events';
import express from 'express';
import http from 'http';
import {ApplicationConfig, ListTodosApplication} from './application';

export {ApplicationConfig};

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: ListTodosApplication;
  private server?: http.Server;

  constructor(options: ApplicationConfig) {
    this.app = express();
    this.lbApp = new ListTodosApplication(options);

    this.app.use('/api', this.lbApp.requestHandler);

    // this.app.get('/', (_: Request, res: Response) => {

    // });
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port ?? 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }
}

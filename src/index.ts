import {ListTodosApplication} from './application';
import {ApplicationConfig, ExpressServer} from './server';

export {ListTodosApplication, ApplicationConfig, ExpressServer};

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log('Server is running!');
}

if (require.main === module) {
  const config = {
    rest: {
      port: process.env.PORT ?? 3000,
      host: process.env.HOST ?? 'localhost',
      listenOnStart: false,
    }
  };
  main(config)
  .catch(err => console.log(err));
}

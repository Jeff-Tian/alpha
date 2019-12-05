import { Application } from 'egg';

export default (app: Application) => {
  app.passport.mount('github', app.config.passportGithub);
};

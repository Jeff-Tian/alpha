import {Service} from 'egg'

/**
 * Test Service
 */
export default class Test extends Service {
  public async healthCheck() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      EGG_SERVER_ENV: process.env.EGG_SERVER_ENV,
      configEnv: this.config.env,
      processVersions: process.versions
    }
  }
}

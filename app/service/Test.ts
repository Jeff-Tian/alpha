import {Service} from 'egg'

/**
 * Test Service
 */
export default class Test extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}, current env = ${
      process.env.NODE_ENV
    }, current SERVER_ENV=${process.env.EGG_SERVER_ENV}, github callback = ${
      this.config.passportGithub!.callbackURL
    }, config.env = '${this.config.env}, process.versions = ${process.versions}`
  }
}

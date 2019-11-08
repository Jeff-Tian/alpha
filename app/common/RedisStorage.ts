import Debug from 'debug'
import {Application} from 'egg'
import ICacheStorage from './ICacheStorage'

const debug = Debug('uniheart')

export default class RedisStorage implements ICacheStorage {
  app: Application

  constructor(app) {
    this.app = app
  }

  public async get(traceId: string) {
    debug('getting by ' + traceId)
    return (await this.app.redis.get(String(traceId))) || ''
  }

  public async save(
    traceId: string,
    referer: string,
    clearAfter: number = 1000 * 60 * 60
  ) {
    await this.app.redis.set(String(traceId), referer)
    await this.app.redis.expire(String(traceId), clearAfter / 1000)
  }

  public async delete(traceId: string) {
    await this.app.redis.del(String(traceId))
  }

  public get size() {
    return 0
  }
}

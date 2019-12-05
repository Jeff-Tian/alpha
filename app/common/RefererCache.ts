import ICacheStorage from './ICacheStorage';

export default class RefererCache {
  private static globalRefererCache: RefererCache
  public readonly cacheTimeout: number
  private storage: ICacheStorage

  public constructor(
    store: ICacheStorage,
    config: {cacheTimeout: number} = { cacheTimeout: 1000 * 60 * 60 },
  ) {
    if (RefererCache.globalRefererCache) {
      throw new Error('RefererCache 已经被实例化过了！');
    }

    this.storage = store;
    this.cacheTimeout = config.cacheTimeout;

    RefererCache.globalRefererCache = this;
  }

  public static getInstance(): RefererCache {
    if (!RefererCache.globalRefererCache) {
      throw new Error('RefererCache 还没有实例化过！');
    }

    return RefererCache.globalRefererCache;
  }

  public async get(traceId: string) {
    return this.storage.get(traceId);
  }

  public async save(traceId: string, referer: string) {
    return this.storage.save(traceId, referer, this.cacheTimeout);
  }

  public async delete(traceId: string) {
    return this.storage.delete(traceId);
  }

  public get size() {
    return this.storage.size;
  }
}

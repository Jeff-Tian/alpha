import ICacheStorage from './ICacheStorage'

export default class MemoryStorage implements ICacheStorage {
  private static store = new Map<string, string>()

  public async get(traceId: string) {
    return MemoryStorage.store.get(String(traceId)) || ''
  }

  public async save(
    traceId: string,
    referer: string,
    clearAfter: number = 1000 * 60 * 60
  ) {
    MemoryStorage.store.set(String(traceId), referer)

    setTimeout(() => MemoryStorage.store.delete(traceId), clearAfter)
  }

  public async delete(traceId: string) {
    await MemoryStorage.store.delete(traceId)
  }

  public get size() {
    return MemoryStorage.store.size
  }
}

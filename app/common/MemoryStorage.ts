import Debug from 'debug';
import ICacheStorage from './ICacheStorage';

const debug = Debug('uniheart');

export default class MemoryStorage implements ICacheStorage {
  private static store = new Map<string, string>()

  public async get(traceId: string) {
    debug('getting by ' + traceId);
    return MemoryStorage.store.get(String(traceId)) || '';
  }

  public async save(
    traceId: string,
    referer: string,
    clearAfter: number = 1000 * 60 * 60,
  ) {
    debug('saving ' + traceId + ': ' + referer + ', ' + clearAfter);
    MemoryStorage.store.set(String(traceId), referer);

    debug('saved ', MemoryStorage.store.size, MemoryStorage.store.get(String(traceId)));

    setTimeout(() => MemoryStorage.store.delete(traceId), clearAfter);
  }

  public async delete(traceId: string) {
    await MemoryStorage.store.delete(traceId);
  }

  public get size() {
    return MemoryStorage.store.size;
  }
}

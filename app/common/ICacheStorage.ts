export default interface ICacheStorage {
  get: (traceId: string) => Promise<string>;
  save: (traceId: string, referer: string, forHowLong: number) => Promise<void>;
  delete: (traceId: string) => Promise<void>;
  size: number;
}

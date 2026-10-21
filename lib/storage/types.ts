/** A provider boundary so database-backed files can be moved to S3-compatible
 * storage later without changing upload forms or content models. */
export type StoredFile = { key: string; url: string; content: Buffer };
export interface StorageProvider {
  put(file: File, assetId: string): Promise<StoredFile>;
  remove(key: string): Promise<void>;
}

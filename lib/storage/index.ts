import "server-only";
import { databaseStorage } from "./database";
import type { StorageProvider } from "./types";

/**
 * All upload code talks to this interface. The default keeps files in the same
 * PostgreSQL database; replace this module with an S3-compatible driver later
 * if a larger media library calls for object storage.
 */
export function storage(): StorageProvider {
  return databaseStorage;
}

import "server-only";
import { randomUUID } from "crypto";
import type { StorageProvider } from "./types";

/**
 * Default Phase 1 storage: the same PostgreSQL database holds uploaded bytes.
 * This avoids a second provider while retaining the small provider boundary for
 * a later S3-compatible migration if the media library becomes large.
 */
export const databaseStorage: StorageProvider = {
  async put(file, assetId) {
    return {
      key: `database/${randomUUID()}`,
      url: `/media/${assetId}`,
      content: Buffer.from(await file.arrayBuffer()),
    };
  },
  async remove() {
    // The row deletion in the media action removes the bytea payload.
  },
};

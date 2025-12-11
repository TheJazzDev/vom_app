import { Timestamp } from 'firebase/firestore';

/**
 * Converts Firestore Timestamp objects to ISO string format
 * to ensure Redux state serializability
 */
export function serializeFirestoreData<T>(data: any): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle Firestore Timestamp objects
  if (data instanceof Timestamp) {
    return data.toDate().toISOString() as any;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map((item) => serializeFirestoreData(item)) as any;
  }

  // Handle objects
  if (typeof data === 'object') {
    const serialized: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        serialized[key] = serializeFirestoreData(data[key]);
      }
    }
    return serialized;
  }

  // Return primitive values as-is
  return data;
}

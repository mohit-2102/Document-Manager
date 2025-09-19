// db.js
import Dexie from "dexie";

// Create DB
export const db = new Dexie("DocsDatabase");

// Define schema
db.version(1).stores({
  docs: "++id, desc, extension, filesize" // auto-id, searchable fields
});

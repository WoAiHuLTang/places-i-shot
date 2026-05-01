import { pool } from "./db.js";

const tableColumnsCache = new Map();

export async function getTableColumns(tableName) {
  if (tableColumnsCache.has(tableName)) {
    return tableColumnsCache.get(tableName);
  }

  const [rows] = await pool.query(`SHOW COLUMNS FROM \`${tableName}\``);
  const columns = new Set(rows.map((row) => row.Field));
  tableColumnsCache.set(tableName, columns);
  return columns;
}

export function clearTableColumnsCache(tableName) {
  if (tableName) {
    tableColumnsCache.delete(tableName);
    return;
  }
  tableColumnsCache.clear();
}

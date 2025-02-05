import { int, bigint, text, mysqlTable } from
"drizzle-orm/mysql-core";

export const users = mysqlTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
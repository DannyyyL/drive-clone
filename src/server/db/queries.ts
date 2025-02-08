import {db} from "~/server/db";
import {files_table as filesSchema, folders_table as foldersSchema} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]){
      throw new Error("Parent folder not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }

  return parents;
}

export function getFolders(folderId: number){
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, folderId));//selecting where folder schema id is equal to folder id
}

export function getFiles(folderId: number){
  return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.id, folderId));

}



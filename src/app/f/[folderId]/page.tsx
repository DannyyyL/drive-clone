import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }

  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const currentFolder = await QUERIES.getFolderById(
    parsedFolderId,
    session.userId,
  );
  if (!currentFolder) {
    return redirect("/drive");
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId, session.userId),
    QUERIES.getFiles(parsedFolderId, session.userId),
    QUERIES.getAllParentsForFolder(parsedFolderId, session.userId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}


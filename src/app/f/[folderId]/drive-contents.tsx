"use client";

import { ChevronRight, Circle } from "lucide-react"
import { FileRow, FolderRow } from "./file-row"
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link"
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function GoogleDriveClone(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  const [color, setColor] = useState("bg-gray-900");

  return (
    <div className={`min-h-screen ${color} text-gray-100 p-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row space-x-1.5 mb-4">
          <button onClick={() => setColor("bg-gray-900")}>
            <Circle className="border-2 rounded-full" color="#111827" fill="#111827"/>
          </button>
          <button onClick={() => setColor("bg-green-300")}>
            <Circle className="border-2 rounded-full" color="#86EFAC" fill="#86EFAC"/>
          </button>
          <button onClick={() => setColor("bg-rose-400")}>
            <Circle className="border-2 rounded-full" color="#FB7185" fill="#FB7185"/>
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
            <Link href="/f/1" className="text-gray-300 hover:text-white mr-2">
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl mb-5">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <UploadButton 
          endpoint="driveUploader" 
          onClientUploadComplete={() => {
            navigate.refresh();
          }} 

          input={{
            folderId: props.currentFolderId,
          }}
        />
      </div>
    </div>
  )
}


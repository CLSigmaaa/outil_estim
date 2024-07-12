"use server";
import fs from "fs";

import { writeFile } from "fs/promises";

export default async function upload(formData: any) {
  const files = [] as File[];

  for (const [key, value] of formData.entries()) {
    if (key === "new_attachments") {
      files.push(value);
    }
  };
  console.log(files);
  if (files.length == 0) throw new Error("No file to upload.");

  const directory = `./public/${formData.get("id")}/`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: false });
  } else {
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const path = directory + file.name;

      try {
        await writeFile(
          path,
          buffer
        );
        return file.name;
      } catch (error) {
        throw new Error("Failed to upload file.");
      }
    }
  }
}

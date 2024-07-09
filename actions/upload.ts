"use server";
import { writeFile } from "fs/promises";

export default async function upload(formData: FormData) {
  const file = formData.get("file") as File;
  console.log(file);
  if (!file) {
    throw new Error("No file found in form data.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${file.name + Date.now().toString()}`;
  try {
    await writeFile(
      `./public/${fileName}`,
      buffer
    );
    return file.name;
  } catch (error) {
    throw new Error("Failed to upload file.");
  }
}

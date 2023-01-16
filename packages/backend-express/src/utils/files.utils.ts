import fs from 'fs';

export async function createFileIfNotExists(filename: string): Promise<void> {
  try {
    await fs.promises.access(filename);
  } catch (error) {
    await fs.promises.writeFile(filename, '');
  }
}

export async function readFileContent(filename: string): Promise<string | null | undefined> {
  try {
    const fileContent = await fs.promises.readFile(filename, 'utf-8');
    return fileContent.length === 0 ? null : fileContent;
  } catch (error) {
    console.log(error)
  }
}

export async function writeToFile(filename: string, data: any): Promise<boolean> {
  try {
    await fs.promises.writeFile(filename, data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getItemById(filename: string, id: number): Promise<object | null> {
  try {
    const fileContent = await fs.promises.readFile(filename, 'utf-8');
    if (fileContent.length === 0) return null

    const items = JSON.parse(fileContent);
    const item = items.filter(item => item.id === id);
    return item.length ? item[0] : null;
  } catch (error) {
    return null;
  }
}
import * as fs from 'fs';
import * as path from 'path';

const fileName = 'db.json';

export const createId = () => Math.floor(Math.random() * 100000);

export class FileDB {
  filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), fileName);
  }

  initializeDB(): void {
    if (!fs.existsSync(this.filePath)) {
      console.log('Creating database file...');
      fs.writeFileSync(this.filePath, JSON.stringify({}));
    }
  }

  readDB(): any {
    this.initializeDB();
    const rawData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(rawData);
  }

  readByKey(key: string): any {
    const data = this.readDB();
    return data[key];
  }

  writeDB(data: object): void {
    this.initializeDB();
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  writeByKey(key: string, value: any): void {
    const data = this.readDB();
    data[key] = value;
    this.writeDB(data);
  }

  deleteByKey(key: string): void {
    const data = this.readDB();
    delete data[key];
    this.writeDB(data);
  }

  deleteDB(): void {
    if (fs.existsSync(this.filePath)) {
      fs.unlinkSync(this.filePath);
    }
  }
}

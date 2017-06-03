const fs = require('fs');
const pathToFile = __dirname + '/../file.json';

let storage: IStorageEntries = null;

class FileCacher implements IStorage {
    async set(key: string, value: string): Promise<void> {
        await this.setStorageIfNotExist();
        storage[key] = value;
        await this.saveStorage();
    }

    async get(key: string): Promise<string> {
        await this.setStorageIfNotExist();
        return Promise.resolve(storage[key]);
    }

    async getAll(): Promise<IStorageEntries> {
        await this.setStorageIfNotExist();
        return Promise.resolve(storage);
    }

    async update(key: string, value: string): Promise<void> {
        await this.setStorageIfNotExist();
    }

    async delete(key: string): Promise<void> {
        await this.setStorageIfNotExist();
        delete storage[key];
        await this.saveStorage();
    }

    async setStorageIfNotExist(): Promise<void> {
        if (!storage) {
            const file = await this.readFile();
            storage = {...file};
        }
    }

    private readFile(): Promise<{}> {
        return new Promise((resolve, reject) => {
            fs.readFile(pathToFile, (err: Error, file: Buffer) => {
                if (err) reject(err);
                resolve(JSON.parse(file.toString()));
            });
        });
    }

    private saveStorage(): Promise<{}> {
        return new Promise((resolve, reject) => {
            console.log(storage);
            fs.writeFile(pathToFile, JSON.stringify(storage), (err: Error) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}

const fileCacher = new FileCacher();
fileCacher.set("one", "1").then(() => console.log('file'));

interface IStorage {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string>;
    getAll(): Promise<IStorageEntries>;
    update(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}

interface IStorageEntries {
    [key: string]: string;
}


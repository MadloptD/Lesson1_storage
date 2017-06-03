/**
 * Created by madlopt on 31.05.17.
 */

import * as fs from "fs";


interface IDataStore2 {
    ReadByKey(key: string): string;
    AddData(key: string, data: string): void;
    DelByKey(key: string): void;
    UpdateByKey(key: string, data: string): void;
    ReadAll(key: string, data: string): string;
}

export class DataStore2 implements IDataStore2 {
    protected cache: {[key: string]: string};
    protected file: string;

    constructor(file: string) {
        this.file = file;
        this.readFile()
            .then((text) => {
                this.cache = this.ConvertStringToObj(text);
            })
            .catch((e) => {
                throw e;
            });
    }

    ReadByKey(key: string): string {
        return this.cache[key];
    }

    AddData(key: string, data: string): void {
        if (!(key in this.cache)) {
            this.cache[key] = data;
            this.writeFile(this.ConvertObjToString(this.cache))
                .catch((e) => {
                    throw e;
                });
        } else {
            throw ("Can't add new data. This key is already exist");
        }
    }

    DelByKey(key: string): void {
        if (key in this.cache) {
            delete this.cache[key];
            this.writeFile(this.ConvertObjToString(this.cache))
                .catch((e) => {
                    throw e;
                });
        } else {
            throw ("Can't del data. This key does not exist");
        }
    }

    UpdateByKey(key: string, data: string): void {
        throw ("This is not implemented yet");
    }

    ReadAll(): string {
        return this.ConvertObjToString(this.cache);
    }

    protected ConvertStringToObj(text: string): {[key: string]: string} {
        try {
            return JSON.parse(text);
        } catch (e) {
            console.log("Illegal format json file");
            throw e;
        }
    }

    protected ConvertObjToString(convertingObject: {[key: string]: string}): string {
        return JSON.stringify(convertingObject);
    }

    protected readFile(): Promise<string> {
        return new Promise<string>((resolve, reject): void => {
            fs.readFile(this.file, "utf8", (error, text) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(text);
                }
            });
        });
    }

    protected writeFile(data: string): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            fs.writeFile(this.file, data, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}

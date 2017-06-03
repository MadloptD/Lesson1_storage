/**
 * Created by dmitrii on 02.06.2017.
 */
import * as fs from "fs";

export interface IStorage {
    set(key: string, value: string): Promise<void>;

    get(key: string): Promise<string>;

    getAll(): Promise<IStorageEntries>;

    update(key: string, value: string): Promise<void>;

    delete(key: string): Promise<void>;
}

export interface IStorageEntries {
    [key: string]: string;
}


export class Storage implements IStorage {
    file: string;
    cache: IStorageEntries;
    protected cacheUpdated: boolean;
    constructor() {
      this.file = "testdata.json";
      this.cacheUpdated = false;
    }

    set(key: string, value: string): Promise<void> {
        throw ("Not implemented yet");
    }

    get(key: string): Promise<string> {
        if (this.cacheUpdated) {
            console.log("Read from cache");
            return new Promise<string>((resolve, reject): void => {
                resolve(this.cache[key]);
            });
        } else {
            console.log("Read from file");
            return new Promise<string>((resolve, reject): void => {
                fs.readFile(this.file, "utf8", (error, text) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this.ConvertStringToObj(text)[key]);
                    }
                });
            });
        }
    }



    getAll(): Promise<IStorageEntries> {
        if (this.cacheUpdated) {
            console.log("Read from cache");

            return new Promise<IStorageEntries>((resolve, reject): void => {
                resolve(this.cache);
            });
        } else {
            console.log("Read from file");
            this.updateCache2();


            return new Promise<IStorageEntries>((resolve, reject): void => {
                console.log("File" + this.cache);
                resolve(this.cache);
            });
        }
    }

    update(key: string, value: string): Promise<void> {
        throw ("Not implemented yet");
    }

    delete(key: string): Promise<void> {
        throw ("Not implemented yet");
    }

    protected async updateCache2(): Promise<void> {
        try {
            const result = await this.updateCache();
            this.cache = this.ConvertStringToObj(result);
            this.cacheUpdated = true;
        } catch (e) {
            throw e;
        }
    }

    protected updateCache(): Promise<string> {
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


}
import * as fs from "fs";
/**
 * Created by Madlopt on 02.06.2017.
 */


export interface IStorage {
    set(key: string, value: string): Promise<void>;

    get(key: string): Promise<string>;

    getAll(): Promise<IStorageEntries>;

    update(key: string, value: string): Promise<void>;

    deleteByKey(key: string): Promise<void>;
}

export interface IStorageEntries {
    [key: string]: string;
}

export class Storage2 implements IStorage {
    protected cache: IStorageEntries = null;
    async set(key: string, value: string): Promise<void> {
        await this.updateDataInCacheAndFile("set", key, value);
    }

    async update(key: string, value: string): Promise<void> {
        await this.updateDataInCacheAndFile("update", key, value);
    }

    async deleteByKey(key: string): Promise<void> {
        await this.updateDataInCacheAndFile("delete", key);
    }

    async get(key: string): Promise<string> {
        await this.checkCache();

        return new Promise<string>((resolve): void => {
            resolve(this.cache[key]);
        });
    }

    async getAll(): Promise<IStorageEntries> {
        await this.checkCache();

        return new Promise<IStorageEntries>((resolve): void => {
            resolve(this.cache);
        });
    }

    protected async checkCache(): Promise<void> {
        if (!this.cache) {
            await this.updateCacheFromFile();
            console.log("CacheIsUpdate");
        }
    }

    protected async  updateDataInCacheAndFile (action: string, key: string, value: string = ""): Promise<void> {
        await this.checkCache();
        if (action == "set") {
                this.cache[key] = value;
        }
        if (!(this.cache[key] == undefined)) {
            if (action == "delete" ) {
                delete this.cache[key];
            }
            if (action == "update") {
                this.cache[key] = value;
            }
        } else {
            throw("No such key " + key);
        }
        await this.WriteToFile(this.cache);
    }

    protected async updateCacheFromFile(): Promise<void> {
        const data = new Promise<string> ((resolve): void => {
            console.log("Read from file");
            fs.readFile("testdata.json", (error, text) => {
                if (error) {
                    throw (error);
                } else {
                    resolve(text.toString());
                }
            });
        });
        this.cache = this.ConvertStringToStorageEntries(await data);
    }

    protected async WriteToFile (cacheResult: IStorageEntries): Promise<void> {
        return new Promise<void> ((resolve): void => {
            console.log("Write to file");
            fs.writeFile("testdata.json", this.ConvertStorageEntriesToString(cacheResult), "utf8", (error) => {
                if (error) {
                    throw (error);
                } else {
                    resolve();
                }
            });
        });
    }

    protected ConvertStringToStorageEntries (text: string): IStorageEntries {
        try {
            return JSON.parse(text);
        } catch (e) {
            throw e;
        }
    }
    protected ConvertStorageEntriesToString (data: IStorageEntries): string {
        try {
            return JSON.stringify(data);
        } catch (e) {
            throw e;
        }
    }

}
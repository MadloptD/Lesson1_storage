/**
 * Created by Madlopt on 02.06.2017.
 */

import {Storage2, IStorageEntries} from "./Storage2";

const storage = new Storage2();

WorkWithStorage();

async function WorkWithStorage (): Promise<void> {
    try {
        let res2: IStorageEntries = await storage.getAll();
        console.log(res2);
        let res: string = await storage.get("one");
        console.log(res);
        await storage.deleteByKey("one");
        res2 = await storage.getAll();
        console.log(res2);
        await storage.set("one", "new one value");
        res2 = await storage.getAll();
        console.log(res2);
        await storage.update("two", "new two value");
        await storage.set("three", "new one value");
        await storage.set("one", "new2 one value");
        res2 = await storage.getAll();
        console.log(res2);
    } catch (e) {
        console.log(e);
    }
}


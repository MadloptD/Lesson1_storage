/**
 * Created by dmitrii on 02.06.2017.
 */
import {IStorageEntries, Storage} from "./DataStore3";
import * as fs from "fs";


const storage = new Storage();

const promise = new Promise((resolve, reject): void => {
    resolve(123);
});

function readFile (): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
        fs.readFile("testdata.json", "utf8", (error, text) => {
            if (error) {
                reject(error);
            } else {
                resolve(text);
            }
        });
    });
}


let text1;
async function rr (): Promise<void> {
    const res = await readFile();
    console.log(res);
    text1 = res;
    console.log("after " + text1);
}

rr();

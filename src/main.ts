import {DataStore} from "./Datastore";
import {DataStore2} from "./Datastore2";
/**
 * Created by madlopt on 31.05.17.
 */
console.log("Hello world");
let unic = function unicorn (): void {
    console.log(datastore.ReadByKey("one"));
    console.log(datastore.ReadByKey("two"));
};
let unic2 = function unicorn2 (): void {
    datastore.AddData("three", "value three");
    console.log(datastore.ReadByKey("three"));
    console.log(datastore.ReadAll());
    datastore.DelByKey("three");
    datastore.AddData("four", "value four");
    console.log(datastore.ReadAll());
};


let datastore = new DataStore2("testdata.json");

setTimeout(unic, 1000);
setTimeout(unic2, 2000);


/**
 * Created by dmitrii on 01.06.2017.
 */
function LearnJavascript (first: string, second: number, callback: (a: number, b: number) => number , last: string = "blabla"): void {
    console.log("i get in function and my first is " + first);
    console.log("i get in function and my Second is " + second);
    console.log("i get in function and my callback() is " + callback(2, 3));
    console.log("i get in function and my callback is " + callback);
    console.log("i get in function and my last is " + last);
}

LearnJavascript("15", 21, (a: number, b: number): number => {
    console.log("Now i came to func WantToKnow");

    return a + b;
});

function WantToknowThis (a: number, b: number): number {
    console.log("Now i came to func WantToKnow");

    return a + b;
}


let text = "{\"one\" : \"value one\", \"two\" : \"value two\"}";
let obj = JSON.parse(text);

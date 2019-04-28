var a/*: number*/ = 1;

var b/*: {
    c: number
}*/ = { c: 10 }

/*:: type Test = {
    c: number
} | {
    d: boolean
}*/


var c/*: Test*/ = { c: 10 }

function testFn(a/*: Boolean*/, b/*: number*/)/*: {}*/ {
    return {}
}
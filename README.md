## flow-comments-codemod [![Build Status](https://travis-ci.org/escaton/flow-comments-codemod.svg)](https://travis-ci.org/escaton/flow-comments-codemod)

This codemod converts [Flow](https://flow.org) syntax into valid JS, but keep it [valid Flow](https://flow.org/en/docs/types/comments/)
```js
type Arg = { data: number }
function fn(arg: Arg): void {
    console.log(arg)
}
```
```js
/*:: type Arg = { data: number } */
function fn(arg/*: Arg*/)/*: void*/ {
    console.log(arg)
}
```
More examples [here](https://github.com/escaton/flow-comments-codemod/tree/master/src/__testfixtures__)

Such transformation may be useful with gradual migration from Flow to Typescript.

In some cases the result may look a bit messy:
```js
var f = (d: any): number);
```
```js
var f = (((d/*: any*/)/*: number*/));
```
so i recommend to apply [Prettier](http://prettier.io/) after transformation.

### Setup & Run

This tool is based on [jscodeshift](https://github.com/facebook/jscodeshift)

```sh
npm install -g jscodeshift
git clone https://github.com/escaton/flow-comments-codemod.git
jscodeshift -t <codemod-script> <file>
```

Use the `-d` option for a dry-run and use `-p` to print the output for
comparison.


## flow-comments-codemod [![Build Status](https://travis-ci.org/escaton/flow-comments-codemod.svg)](https://travis-ci.org/escaton/flow-comments-codemod)

### Setup & Run

```sh
npm install -g jscodeshift
git clone https://github.com/escaton/flow-comments-codemod.git
jscodeshift -t <codemod-script> <file>
```

Use the `-d` option for a dry-run and use `-p` to print the output for
comparison.
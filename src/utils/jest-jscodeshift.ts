import * as fs from 'fs';
import * as path from 'path';
import { runInlineTest } from 'jscodeshift/src/testUtils';

function runTest(dirName, transformName, transformModule, options, testFilePrefix) {
  if (!testFilePrefix) {
    testFilePrefix = transformName;
  }

  const fixtureDir = path.join(dirName, '..', '__testfixtures__');
  const inputPath = path.join(fixtureDir, testFilePrefix + '.input.js');
  const source = fs.readFileSync(inputPath, 'utf8');
  const expectedOutput = fs.readFileSync(
    path.join(fixtureDir, testFilePrefix + '.output.js'),
    'utf8'
  );
  runInlineTest(
    transformModule,
    options,
    {
      path: inputPath,
      source
    },
    expectedOutput
  );
}

function defineTest(dirName, transformName, transformer?, options?, testFilePrefix?) {
  const testName = testFilePrefix
    ? `transforms correctly using "${testFilePrefix}" data`
    : 'transforms correctly';

  describe(transformName, () => {
    it(testName, () => {
      runTest(dirName, transformName, transformer, options, testFilePrefix);
    });
  });
}

export {defineTest}
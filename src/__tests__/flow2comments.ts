jest.autoMockOff();

import { defineTest } from '../utils/jest-jscodeshift';
import { flow2comments as transformer } from '../flow2comments';

defineTest(__dirname, 'flow2comments', transformer);
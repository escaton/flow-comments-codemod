jest.autoMockOff();

import { defineTest } from '../utils/jest-jscodeshift';
import flow2comments from '../flow-comments';

defineTest(__dirname, 'flow-comments', flow2comments);

import { join } from 'path';

import { rootDir } from '../utils/env';

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@core': join(rootDir, '/src/core'),
  '@model': join(rootDir, '/src/model'),
  '@logic': join(rootDir, '/src/logic'),
  '@shared': join(rootDir, '/src/shared'),
  '@config': join(rootDir, '/src/core/Configs'),
  '@styles': join(rootDir, '/src/assets/theme'),
  '@images': join(rootDir, '/src/assets/images'),
};

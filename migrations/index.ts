import * as migration_20260824_082623 from './20260824_082623';

export const migrations = [
  {
    up: migration_20260824_082623.up,
    down: migration_20260824_082623.down,
    name: '20260824_082623'
  },
];

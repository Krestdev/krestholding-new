import * as migration_20260824_082623 from './20260824_082623';
import * as migration_20260829_081059 from './20260829_081059';

export const migrations = [
  {
    up: migration_20260824_082623.up,
    down: migration_20260824_082623.down,
    name: '20260824_082623',
  },
  {
    up: migration_20260829_081059.up,
    down: migration_20260829_081059.down,
    name: '20260829_081059'
  },
];

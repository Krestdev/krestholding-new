import * as migration_20260824_082623 from './20260824_082623';
import * as migration_20260829_081059 from './20260829_081059';
import * as migration_20261009_083838_media_prefix_and_job_opening_fields from './20261009_083838_media_prefix_and_job_opening_fields';

export const migrations = [
  {
    up: migration_20260824_082623.up,
    down: migration_20260824_082623.down,
    name: '20260824_082623',
  },
  {
    up: migration_20260829_081059.up,
    down: migration_20260829_081059.down,
    name: '20260829_081059',
  },
  {
    up: migration_20261009_083838_media_prefix_and_job_opening_fields.up,
    down: migration_20261009_083838_media_prefix_and_job_opening_fields.down,
    name: '20261009_083838_media_prefix_and_job_opening_fields'
  },
];

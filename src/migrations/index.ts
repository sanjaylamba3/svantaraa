import * as migration_20261015_092345_initial from './20261015_092345_initial';
import * as migration_20261015_100503 from './20261015_100503';
import * as migration_20261015_101014 from './20261015_101014';
import * as migration_20261015_191623_add_media_object_key from './20261015_191623_add_media_object_key';

export const migrations = [
  {
    up: migration_20261015_092345_initial.up,
    down: migration_20261015_092345_initial.down,
    name: '20261015_092345_initial',
  },
  {
    up: migration_20261015_100503.up,
    down: migration_20261015_100503.down,
    name: '20261015_100503',
  },
  {
    up: migration_20261015_101014.up,
    down: migration_20261015_101014.down,
    name: '20261015_101014',
  },
  {
    up: migration_20261015_191623_add_media_object_key.up,
    down: migration_20261015_191623_add_media_object_key.down,
    name: '20261015_191623_add_media_object_key'
  },
];

import * as migration_20261015_092345_initial from './20261015_092345_initial';

export const migrations = [
  {
    up: migration_20261015_092345_initial.up,
    down: migration_20261015_092345_initial.down,
    name: '20261015_092345_initial'
  },
];

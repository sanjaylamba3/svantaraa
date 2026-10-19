import * as migration_20261015_092345_initial from './20261015_092345_initial';
import * as migration_20261015_100503 from './20261015_100503';
import * as migration_20261015_101014 from './20261015_101014';
import * as migration_20261015_191623_add_media_object_key from './20261015_191623_add_media_object_key';
import * as migration_20261016_090257_rhythm_photos from './20261016_090257_rhythm_photos';
import * as migration_20261016_093959_testimonials_pet_photo from './20261016_093959_testimonials_pet_photo';
import * as migration_20261016_100721_site_footer_global from './20261016_100721_site_footer_global';
import * as migration_20261016_102812_hero_video from './20261016_102812_hero_video';
import * as migration_20261018_234947_drop_purpose_founder_fields from './20261018_234947_drop_purpose_founder_fields';
import * as migration_20261018_235804_add_purpose_metric_card from './20261018_235804_add_purpose_metric_card';
import * as migration_20261019_003431_drop_testimonial_unused_fields from './20261019_003431_drop_testimonial_unused_fields';
import * as migration_20261019_075723_add_instagram_section from './20261019_075723_add_instagram_section';
import * as migration_20261019_100838_homepage_optional_scalars_drop_hero_badge from './20261019_100838_homepage_optional_scalars_drop_hero_badge';

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
    name: '20261015_191623_add_media_object_key',
  },
  {
    up: migration_20261016_090257_rhythm_photos.up,
    down: migration_20261016_090257_rhythm_photos.down,
    name: '20261016_090257_rhythm_photos',
  },
  {
    up: migration_20261016_093959_testimonials_pet_photo.up,
    down: migration_20261016_093959_testimonials_pet_photo.down,
    name: '20261016_093959_testimonials_pet_photo',
  },
  {
    up: migration_20261016_100721_site_footer_global.up,
    down: migration_20261016_100721_site_footer_global.down,
    name: '20261016_100721_site_footer_global',
  },
  {
    up: migration_20261016_102812_hero_video.up,
    down: migration_20261016_102812_hero_video.down,
    name: '20261016_102812_hero_video',
  },
  {
    up: migration_20261018_234947_drop_purpose_founder_fields.up,
    down: migration_20261018_234947_drop_purpose_founder_fields.down,
    name: '20261018_234947_drop_purpose_founder_fields',
  },
  {
    up: migration_20261018_235804_add_purpose_metric_card.up,
    down: migration_20261018_235804_add_purpose_metric_card.down,
    name: '20261018_235804_add_purpose_metric_card',
  },
  {
    up: migration_20261019_003431_drop_testimonial_unused_fields.up,
    down: migration_20261019_003431_drop_testimonial_unused_fields.down,
    name: '20261019_003431_drop_testimonial_unused_fields',
  },
  {
    up: migration_20261019_075723_add_instagram_section.up,
    down: migration_20261019_075723_add_instagram_section.down,
    name: '20261019_075723_add_instagram_section',
  },
  {
    up: migration_20261019_100838_homepage_optional_scalars_drop_hero_badge.up,
    down: migration_20261019_100838_homepage_optional_scalars_drop_hero_badge.down,
    name: '20261019_100838_homepage_optional_scalars_drop_hero_badge'
  },
];

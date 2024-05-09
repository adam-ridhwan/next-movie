import { fetchTMDB } from '@/actions/fetch-tmdb';

import { ContentRouteParams } from '@/types/global-types';
import { ExternalIds } from '@/types/tmdb-types';
import {
  FacebookIcon,
  ImdbIcon,
  InstagramIcon,
  TwitterIcon,
} from '@/components/icons';

const ExternalLinks = async ({ id, mediaType }: ContentRouteParams) => {
  const { imdb_id, instagram_id, twitter_id, facebook_id } = await fetchTMDB(
    ExternalIds,
    { mediaType, id, category: 'media_external_ids' }
  );

  return (
    <div className='flex flex-row gap-4'>
      {facebook_id && <FacebookIcon id={facebook_id} />}
      {instagram_id && <InstagramIcon id={instagram_id} />}
      {twitter_id && <TwitterIcon id={twitter_id} />}
      {imdb_id && <ImdbIcon id={imdb_id} />}
    </div>
  );
};

export default ExternalLinks;

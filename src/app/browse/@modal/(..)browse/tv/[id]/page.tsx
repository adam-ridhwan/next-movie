import { fetchCredits } from '@/actions/fetch-credits';
import { fetchDetails } from '@/actions/fetch-details';
import { fetchKeywords } from '@/actions/fetch-keywords';
import { fetchRecommendations } from '@/actions/fetch-recommendations';

import { CONTENT_TYPES } from '@/lib/types';
import Modal from '@/components/modal';

export default async function TvModal({ params: { id } }: { params: { id: string } }) {
  const detailsPromise = fetchDetails(id, CONTENT_TYPES.TV);
  const creditsPromise = fetchCredits(id, CONTENT_TYPES.TV);
  const keywordsPromise = fetchKeywords(id, CONTENT_TYPES.TV);
  const recommendationsPromise = fetchRecommendations(id, CONTENT_TYPES.TV);

  const [
    details,
    credits,
    keywords,
    recommendations
  ] = await Promise.all([
    detailsPromise,
    creditsPromise,
    keywordsPromise,
    recommendationsPromise,
  ]); // prettier-ignore

  return <Modal content={{ details, credits, keywords: keywords.results, recommendations }} />;
}

import { fetchCredits } from '@/actions/fetch-credits';
import { fetchDetails } from '@/actions/fetch-details';
import { fetchKeywords } from '@/actions/fetch-keywords';
import { fetchRecommendations } from '@/actions/fetch-recommendations';

import { ContentType } from '@/lib/types';
import Modal from '@/components/modal';

export default async function MovieModal({
  params: { contentType, id },
}: {
  params: { contentType: ContentType; id: string };
}) {
  const detailsPromise = fetchDetails(id, contentType);
  const creditsPromise = fetchCredits(id, contentType);
  const keywordsPromise = fetchKeywords(id, contentType);
  const recommendationsPromise = fetchRecommendations(id, contentType);

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

  const parsedKeyword = keywords.keywords || keywords.results;

  return <Modal content={{ details, credits, keywords: parsedKeyword, recommendations }} />;
}

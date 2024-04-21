import { ContentType } from '@/lib/types';

export default function BrowseMoviePage({
  params: { contentType, id },
}: {
  params: { contentType: ContentType; id: string };
}) {
  return (
    <>
      <div>DYNAMIC {contentType} PAGE</div>
    </>
  );
}

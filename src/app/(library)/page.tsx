import { DomContextProvider } from '@/providers/dom-provider';
import { SliderProvider } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { prisma } from '@/lib/client';
import { DEVELOPMENT_MODE, libraryStrings } from '@/lib/constants';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { HeadingExtraSmall } from '@/components/fonts';
import Slider from '@/components/slider/slider';

const MOCK_TRENDING_TILES: Movie[] = [
  {
    id: '5166dc5a-d7b6-426f-891f-79669b5457dc',
    uuid: '248acb2e-1e4e-4413-b83a-a6ed4ebb611d',
    title: '1',
    description: 'Description 1',
    thumbnailUrl: 'https://picsum.photos/id/4/200/300',
  },
  {
    id: '7df5b2b1-098e-4562-a358-b8188f6fb615',
    uuid: '8cca6afb-f538-433c-b05c-d70c2a685bc6',
    title: '2',
    description: 'Description 2',
    thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: '3593bb00-3472-4552-aea0-e876d59e175c',
    uuid: 'fd74c5cf-91f2-4698-ba6c-ad4a130b535f',
    title: '3',
    description: 'Description 3',
    thumbnailUrl: 'https://picsum.photos/id/5/200/300',
  },
  {
    id: '2b8fba7c-227d-4ef7-b459-76b726e18266',
    uuid: '6a31e288-2ace-433d-bed0-6e158a314059',
    title: '4',
    description: 'Description 4',
    thumbnailUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    id: '76b0f11d-1c4a-4f9d-a4f5-21508ddec625',
    uuid: 'c8224d89-abb0-4b1c-a0b5-36a29594e56a',
    title: '5',
    description: 'Description 5',
    thumbnailUrl: 'https://picsum.photos/id/9/200/300',
  },
  {
    id: 'e2b7205d-5d1d-475d-800e-4d50d851eb8a',
    uuid: '816157f3-27c9-4866-917c-baa65e2f5375',
    title: '6',
    description: 'Description 6',
    thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: '3a2d5f96-5beb-465e-b906-bcefc41d113a',
    uuid: '4387b663-4cf7-4c3a-991e-7bb26676abb6',
    title: '7',
    description: 'Description 7',
    thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: '03204e87-e64f-4442-81c4-ff3f2398b260',
    uuid: '2998909c-5fdd-4a97-ab84-f3db5e01e83e',
    title: '8',
    description: 'Description 8',
    thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: 'd57c798f-672b-4144-9fa2-09e5d1705ed6',
    uuid: '491cfdb0-b204-4999-85db-0ab5f8fb17ac',
    title: '9',
    description: 'Description 9',
    thumbnailUrl: 'https://picsum.photos/id/9/200/300',
  },
  {
    id: 'd04b5643-49f8-43cc-898f-38b8abaa8f86',
    uuid: 'd02e70e3-bbbf-4395-b693-52d66ea79760',
    title: '10',
    description: 'Description 10',
    thumbnailUrl: 'https://picsum.photos/id/6/200/300',
  },
  {
    id: '770b7609-7614-4970-ab32-4bcce3ac2182',
    uuid: 'aaf480cf-b50f-41a5-a32d-efa54595b4be',
    title: '11',
    description: 'Description 11',
    thumbnailUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    id: 'd0737b25-dd92-46d7-8550-0d4bfefac81f',
    uuid: 'f7b4f52c-c349-4f8e-9bc4-a386b4496872',
    title: '12',
    description: 'Description 12',
    thumbnailUrl: 'https://picsum.photos/id/9/200/300',
  },
  {
    id: '6c3c9682-4915-4f87-a523-8e8258a7f60a',
    uuid: 'eb47359b-dc01-4875-8d44-cc4bd782da3b',
    title: '13',
    description: 'Description 13',
    thumbnailUrl: 'https://picsum.photos/id/3/200/300',
  },
  {
    id: 'db9617fb-0970-4c6d-8b97-9091803caa0b',
    uuid: 'd57ae71b-0a6b-4a79-90f5-e6c6cfd3299d',
    title: '14',
    description: 'Description 14',
    thumbnailUrl: 'https://picsum.photos/id/7/200/300',
  },
  {
    id: 'a1b7984e-1413-4fe1-919c-a37adab69e81',
    uuid: 'cd5a1a20-deb1-4938-bc4e-135ea3f2a6c0',
    title: '15',
    description: 'Description 15',
    thumbnailUrl: 'https://picsum.photos/id/8/200/300',
  },
  {
    id: 'f0fbf8b0-b979-4220-9257-1fea12630206',
    uuid: '16bf157b-ad82-4fac-ad8f-6c36088b9a83',
    title: '16',
    description: 'Description 16',
    thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: 'cc701ccf-b9bf-4b61-a42b-c955421e5aeb',
    uuid: '764f64d3-288e-4f7d-8ad5-3a42a4118256',
    title: '17',
    description: 'Description 17',
    thumbnailUrl: 'https://picsum.photos/id/2/200/300',
  },
  {
    id: 'fb5b5d8c-428c-4d73-a970-f620a5a101d5',
    uuid: '0eba69db-5102-408d-aa0c-06e6680e9c4f',
    title: '18',
    description: 'Description 18',
    thumbnailUrl: 'https://picsum.photos/id/3/200/300',
  },
  {
    id: '61669fbf-d3e5-4fea-af68-6644e4cff663',
    uuid: '827854b7-4fe8-441a-bbb2-e4a62de446d3',
    title: '19',
    description: 'Description 19',
    thumbnailUrl: 'https://picsum.photos/id/4/200/300',
  },
  // {
  //   id: '1f38e35b-6c98-49e9-ae97-8b4251b42a31',
  //   uuid: 'c7c4e7dd-31d6-483c-8fda-78509e37c358',
  //   title: '20',
  //   description: 'Description 20',
  //   thumbnailUrl: 'https://picsum.photos/id/5/200/300',
  // },
  // {
  //   id: '5b829b06-7233-4d34-ab53-e150c3ba70b0',
  //   uuid: '20bdc1d5-12e6-45ad-9550-e2a2ad9b7091',
  //   title: '21',
  //   description: 'Description 21',
  //   thumbnailUrl: 'https://picsum.photos/id/6/200/300',
  // },
  // {
  //   id: '60b23cf0-e20d-40ce-9a20-b5f6ff6a697b',
  //   uuid: 'b30a7e89-79ff-4d76-89f7-8eedeec4ba33',
  //   title: '22',
  //   description: 'Description 22',
  //   thumbnailUrl: 'https://picsum.photos/id/7/200/300',
  // },
  // {
  //   id: '09bb85ca-aee9-444b-a4a3-955f621561b0',
  //   uuid: '9111e7d3-418c-4f0f-8cf3-e1e174042f08',
  //   title: '23',
  //   description: 'Description 23',
  //   thumbnailUrl: 'https://picsum.photos/id/8/200/300',
  // },
  // {
  //   id: '4f0a900e-a77f-47ad-9ff3-71073df8b267',
  //   uuid: 'cc515666-0d37-467b-8d49-885aabfc845c',
  //   title: '24',
  //   description: 'Description 24',
  //   thumbnailUrl: 'https://picsum.photos/id/9/200/300',
  // },
  // {
  //   id: 'b7a965ed-a1ec-4524-a7ab-8193eed8c72e',
  //   uuid: 'c2ffa06e-c90e-42f6-88b0-f191b6b4d89c',
  //   title: '25',
  //   description: 'Description 25',
  //   thumbnailUrl: 'https://picsum.photos/id/10/200/300',
  // },
  // {
  //   id: 'f9b27cfc-eb3d-44cf-a892-fc07de74cea7',
  //   uuid: 'bdcc67bd-986c-4e0d-bc3d-b51a3bd3a254',
  //   title: '26',
  //   description: 'Description 26',
  //   thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  // },
  // {
  //   id: 'b67a3a58-b3f1-4275-8baa-d83567a19ed5',
  //   uuid: '2f908da0-4904-4ce4-9a79-480fca63738a',
  //   title: '27',
  //   description: 'Description 27',
  //   thumbnailUrl: 'https://picsum.photos/id/2/200/300',
  // },
  // {
  //   id: 'acad0a85-80af-4183-aedd-def6013f601f',
  //   uuid: '64bbdbfa-9ac6-46b6-a0f3-2a01ac8185d8',
  //   title: '28',
  //   description: 'Description 28',
  //   thumbnailUrl: 'https://picsum.photos/id/3/200/300',
  // },
  // {
  //   id: '7a9457fa-da94-4797-abcb-983ac3d15dee',
  //   uuid: '497b5ce2-8995-4c4f-91db-ae2b28fd67d8',
  //   title: '29',
  //   description: 'Description 29',
  //   thumbnailUrl: 'https://picsum.photos/id/4/200/300',
  // },
  // {
  //   id: '1242efd6-a40f-41a8-9c22-f1b4f7d5977f',
  //   uuid: '01ce64b0-764d-49c1-95cf-80fbf67dbd91',
  //   title: '30',
  //   description: 'Description 30',
  //   thumbnailUrl: 'https://picsum.photos/id/5/200/300',
  // },
  // {
  //   id: 'd5d63464-9733-4379-9c8d-9ed837c90f9c',
  //   uuid: '3ed0d776-360c-4953-8fd1-e745cd1e9b47',
  //   title: '31',
  //   description: 'Description 31',
  //   thumbnailUrl: 'https://picsum.photos/id/6/200/300',
  // },
  // {
  //   id: 'ca74a1c5-0731-4097-ac8f-efef8c6f9e48',
  //   uuid: '7ac448a2-d9dd-47a6-9eb7-d7a1e81a809c',
  //   title: '32',
  //   description: 'Description 32',
  //   thumbnailUrl: 'https://picsum.photos/id/7/200/300',
  // },
  // {
  //   id: '6554fe90-8b22-422a-8696-04e1d4b49639',
  //   uuid: '89127c9b-4a36-40f3-8839-8028e1b65eca',
  //   title: '33',
  //   description: 'Description 33',
  //   thumbnailUrl: 'https://picsum.photos/id/8/200/300',
  // },
  // {
  //   id: 'bf346e2c-e71a-46d5-8564-1cf843446bca',
  //   uuid: 'afaaf944-933a-4a9f-9c09-1edffe98c4d4',
  //   title: '34',
  //   description: 'Description 34',
  //   thumbnailUrl: 'https://picsum.photos/id/9/200/300',
  // },
  // {
  //   id: 'ab03b279-9e93-4111-8246-5cde40813aea',
  //   uuid: '60581633-2740-4254-a6dc-0c5183d8de10',
  //   title: '35',
  //   description: 'Description 35',
  //   thumbnailUrl: 'https://picsum.photos/id/10/200/300',
  // },
];

export default async function Home() {
  const fetchedTiles = await prisma.movie.findMany({});

  const tiles = DEVELOPMENT_MODE ? [MOCK_TRENDING_TILES] : [fetchedTiles];

  // Need to add a new uuid to each tile to prevent flickering when the slider is re-rendered
  for (const tile of tiles[0]) tile.uuid = uuid();

  return (
    <div>
      {tiles.map(tiles => (
        <div key={tiles.length} className='flex flex-col gap-1 pt-5'>
          <SliderProvider tiles={tiles}>
            <DomContextProvider>
              <HeadingExtraSmall className='px-12'>{libraryStrings.trending}</HeadingExtraSmall>
              <Slider />
            </DomContextProvider>
          </SliderProvider>
        </div>
      ))}
    </div>
  );
}

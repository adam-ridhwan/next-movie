import { v4 as uuid } from 'uuid';

import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';

export const MOCK_TRENDING_TILES: Movie[] = [
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
  // {
  //   id: 'db9617fb-0970-4c6d-8b97-9091803caa0b',
  //   uuid: 'd57ae71b-0a6b-4a79-90f5-e6c6cfd3299d',
  //   title: '14',
  //   description: 'Description 14',
  //   thumbnailUrl: 'https://picsum.photos/id/7/200/300',
  // },
  // {
  //   id: 'a1b7984e-1413-4fe1-919c-a37adab69e81',
  //   uuid: 'cd5a1a20-deb1-4938-bc4e-135ea3f2a6c0',
  //   title: '15',
  //   description: 'Description 15',
  //   thumbnailUrl: 'https://picsum.photos/id/8/200/300',
  // },
  // {
  //   id: 'f0fbf8b0-b979-4220-9257-1fea12630206',
  //   uuid: '16bf157b-ad82-4fac-ad8f-6c36088b9a83',
  //   title: '16',
  //   description: 'Description 16',
  //   thumbnailUrl: 'https://picsum.photos/id/1/200/300',
  // },
  // {
  //   id: 'cc701ccf-b9bf-4b61-a42b-c955421e5aeb',
  //   uuid: '764f64d3-288e-4f7d-8ad5-3a42a4118256',
  //   title: '17',
  //   description: 'Description 17',
  //   thumbnailUrl: 'https://picsum.photos/id/2/200/300',
  // },
  // {
  //   id: 'fb5b5d8c-428c-4d73-a970-f620a5a101d5',
  //   uuid: '0eba69db-5102-408d-aa0c-06e6680e9c4f',
  //   title: '18',
  //   description: 'Description 18',
  //   thumbnailUrl: 'https://picsum.photos/id/3/200/300',
  // },
  // {
  //   id: '61669fbf-d3e5-4fea-af68-6644e4cff663',
  //   uuid: '827854b7-4fe8-441a-bbb2-e4a62de446d3',
  //   title: '19',
  //   description: 'Description 19',
  //   thumbnailUrl: 'https://picsum.photos/id/4/200/300',
  // },
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

export const data: Movie[] = [
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Code 8',
    description: 'Code 8',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABQHm0o9L9gAPxC9OkFY9oHtemRLHQDy-TwLy3kg6SPNc8e-rbaFeraVforDNusiypZLndtSTqaZl2RSD-8RIFJtytg09ed4aLpw-H21EO6518WndN1nUvtcLTcCrvKcgQM.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'From Scratch',
    description: 'From Scratch',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABQNK29aE5W6pvjoYk_EqGFc8C3BM2zbx3Ic7ceP83cjM9uz9Kk5JUitEm-ZC12y8zXevgrSKJE4ZCuezKusDaHO33h1v8JZdlG-ppD74rtnKHLq8599wD2m6OfUK20mMpFhf-utUtKyLPL0KI70iQFXSFfQFcY4f9rs.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Heartstopper',
    description: 'Heartstopper',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABQg9UgDSdODtPwmGFNH4IV7ujPbpwILf-bYQ5WtkPpBxzfbdP8zRfp48r_6meeiSnCVKR2q3Q1MlKD38aDUJQoW6ETP02bpsBunAUVYnMvezxRw3nSLVCtnqxwMFjrm-bx2s-Dlxe51qYs0QYtsqTKuGx4FmXkA7W0y.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Nowhere',
    description: 'Nowhere',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABQpEO6iqWEkhEgicbyRTNi39uWwiOwxeswkWxj_SzhWPbjK3cHnkQDjk4lU2GRISJHxgIQA8pcUDfm8cK2IjCi1AKEWKRXNX1CSncZ_vfCYiHIrSZCA5CMOA9hEPteMn8rQu-oAQCxnjp6Iv4RYCNB7Ma90405LzU6W.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Friday Night Lights',
    description: 'Friday Night Lights',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABQuqvtJQ_WXNzRpwGkJrRtAVKA_9DcgQw0ole27Ik7DEVyOseh9ASNWn9Qt-U1osmbYCDaQsPQT48FAqFcoMznMX3U31Cg94GGc-Q3elhEQ6AwBmcyL5hvablIkQjnfZxZ.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Inside Man',
    description: 'Inside Man',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABR1F78N7F5SxWPqieLFmzeCcSq0LI3zgoUWw-KGoX6D5NQD5lP-rK2VuAZz4MNu8npmj8aiS69B42fU_jC1DChCbmcAjKdnofIQ-2VRbXih08kPBWxSOLYttnsZGNWzsif.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Locke & Key',
    description: 'Locke & Key',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABR2TZNV1djODBjz2Nv38o1Tdg-tZ45fgSTJNCI1jXiPPl1_fNgbZSngSNvn3zisAAoXMIef4CInqgzWDTX0bQwVqtsv12sTZtTSE5jws_B9LYY8N4OXwwO1Y9NJPSQ5472Gk-L84mNE29RZZeKNU0k4ERFWvMx7XN0i.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Beyond Skyline',
    description: 'Beyond Skyline',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABRDKtf1OC80Bxih6Us6hQj7bj8kBc9aBvYvkHr3CVbzgKGNVjQ2YjTNflrni2S35evGb4PqMA9vyfDL2eV8ABAzAQRo2Qmi4Hy0-14jsKNCe6MrSuHhvjGYW9WYeCkCHjG.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Sweet Tooth',
    description: 'Sweet Tooth',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABRFoQO5R5E5hgLCcPvLN5JQTwVjOtaZFwd_-W58nhVO84gbBzCf3Ltnw5XT30UhwAN4YHeAIOehOM_RgtYb7RDjyphggGY5cDZ5U1SPyXvmTVks4bJgPzULxd_mUnF2QRRso-aYxCDy6ODeCR8KpFQ9MosyY3PyMTLP.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Demon Slayer',
    description: 'Demon Slayer',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABRcPN0QlBFemyXiOLqUHaicdXrSgG3ptqQ6DhOjtmoP9Pq5NkFlmtrMf9ZxDOeivODA7tbnO8pB3upZkWa8rVV45uO9LRZOcSW4-fAyglBKErVkgGoWFrdzHezlkqKUcbx.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'One Piece',
    description: 'One Piece',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABS8KD3Ht5nMgSPFhMStckZJS5UqfSd_TsGnU0mgz6Z94tbtkJmcmFzey5_Ok5QVnCD69BRv0WJ5itHBEww_8Ix53CIBm_kerDhMSYQ1nANIWE6RC2M-IoiMUUixHPH1uL1ikt5-Cx9OhZVwgHRtFMU25BPm6KyKVvNxgD7vkZSn00vBIjiIpkc8eOMj-QgTqMWrsrZ_iDIeEygQbxvwOaaSEMw5ZOjIEhMXzev_C9Pu-KTpOpOuzBZOxLwIB0SWzfVf5ggZUo5.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'This is Us',
    description: 'This is Us',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABSOXmTvyJi_MqTOGbKaJ6r3rX_P5xeV2kpYi6pwBwe58ZLCX1J3A7SoyVM0kzv2CTt_AKTK0sKgsiFVYGEfHN4ltxQdJ08Iujfk-mxsvjd4vhSJ50mLPauSlUpkxQr651i.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Sex Education',
    description: 'Sex Education',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABSlNBUVr977MUKhrldyzr1EKUiNnrCPzjG8Evt-fEgWO15SGgPxRhgJ7sXlg8LycNyXAm8gwBr-DCkCchdEbufPdf1jaBuVKjY93J2KVhGgnx-hKwAqi1dqUuUrDlQhW6_oF-DdLpYkYaPfKLy87XMl4jlMEJc4Cz6I.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Skylines',
    description: 'Skylines',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABT5Y9FnackEZ3kLBWwfjFNArDIkvsdtvHJehcLCU3YfeF3D09LBZ4Rx8ggkPM_4TLy9pidHEtYANPhwpvCUDIMsiDVNNsR5e13E-be9CtYfhRKte1txcEVPYSw3PYJpkUs.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Voyagers',
    description: 'Voyagers',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABTdVrrj8TWDV5MdxKM2Bsl5p-bGA7ZRWn7bIxCRwk3dpAOhBDlvkGO6oyaXczWiztmpSink20NI1mw0vFFmFvOcyDbY4M4c2fp4-MDEPy36d1r807qbJnVUxntk02Jw3Dm.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Bird Box',
    description: 'Bird Box',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABTj74LN_Q6KnYHlXYZpzs9x46xnv9IxxdWHc7PaNi41YUGD10OpDkKSoB79OwOESoYXFnRmqMTibkkcok2bU21q49Ca5mU_wVLv6GQd3ilQJhhy2KLc-_MSIYgRT_SEoPpDO-WbFbGfhV3BZ8Eg4sQFuVukqunDYSjC.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Disenchantment',
    description: 'Disenchantment',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABUwAbMfiQixOfXjJ7cR4cIm9tD1ZOSs3gKoj1kSoC_Uz3ugaW2y2oGxRPvyxSt1OTIHqBk6Gk3spiyiyJlssYAoEkgD3Nva9xn2OC1bsq4bC_xmkml26YGR8HUeA-avQn8AA-QbVH2kAqdk0D9qNs2L3M8V544LVdCu.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Suzume',
    description: 'Suzume',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABV_6aHysOV0DkUgm2UIwQY0k7AVKk7Z5BQ9lhWExr5UVF7-rU3gDK58w7nCVoVA6R5hLJiwddWvk9XOBYN5gXDzUyuOB31ugUSfZvP2L-IEQKZJijM-Bhq-vpRJ94d7qL5YcJupoDTjBnQI2fXSBfu7Wj_SZY_g5pHF3UWwBo0MTkpQl6NrBNR5qL4-4NK_TCwAJBMZXJo4PJ4zp5YHVQZDlAB1Gl48ql8yrHwXJ9pM-T60ixsfsATbfEcj0qrVYXInb2iHn5u.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Lucifer',
    description: 'Lucifer',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABVuuY6ld3ibuFxrr7RKGRLdqcMdZLV2zkfQKRJNtD0xPv3ce6zuFhrvLCEghwb8UcxCxoIJYLB9OtuHFe8oWqxI-avcpdEwDlsMAHJDUmYIkGknA-RXngXFywFRsEo1M7SIl-Mgx6229Yeae9qc7hMNliIcEQtSIaJB.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Glitch',
    description: 'Glitch',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABWTlfoDzq9_i6t-1-PwBxjlAzQgDk79uR6zHy4rrTOZTT2zqCa6SBWd2RiRo-rXlpXvXL0EGbWZ1jSj0sz-lQA-5vurzINhfuz63cdP2-mYL2JObmztVOVPAsVX8ad53Pb_v-qE7lMApxLZSmQnAzA7H54lhf5ecQmu.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: '2012',
    description: '2012',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABXAc8y_S926CuNJM_UB6gnoqNsWSo04Jhj8gZ5JC6IpB73RlsrR9SBjrdQm98zX6-WH143PpJJlg8ex-gQ89yJaUO6vdr_489rs-UpirWz0Zg9AYIM2QD5pCszOBoZYdpI.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Cyberpunk',
    description: 'Cyberpunk',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABZ3Q1z-LZLlevG6UdrgqCPrYPjZ-5hP7zXCwA6WRbh3UMtVIUIlLI-7zTyIloUEpX650hCOKoIa_h0PEbh6GnOa_y8RsO6d5YXrXQx1Sx0EqujLFXeKk5Z0KwzLAJ2f7Zz1W-DS5LowWkGBXYK92he9r4Ifct11SjFr.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Adam Project',
    description: 'Adam Project',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABaJKoHNGN9r60KS-KtTfdNSDZX58oGHJHoXzci6E2VmDcM0NuNcpSHOoGcl5tdruhiLCKVcZDFOEjIJKNWB1Ip_7IO_BmXTKZTQ41s-Gd1yJ8fhJJRu044TX482D7mgDFkuh-Ou0jGHm2DOsVHYNiqiZCqp0H9etJg6.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Crash Landing On You',
    description: 'Crash Landing On You',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABaWVTbwH8x327ymitgWJDz2Z-rnAfgzVHvSgWaPm6Cv8A1_7D6mlkoSJYMkj5jJC53G2Q0kUbACGQM9aSO3a7AetbFOyscIQqywo4afMjWyQcmZcIzHVlz3SsH81m70OquiE-KcySZSCMZeFfUAVcm4g7x8M4sSjFki.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'The Imperfects',
    description: 'The Imperfects',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABaqCTHEyrMPnDFs3n30cWFjcYoGh9Pjh5xPsDqaoON6rhwo5UoB3xtvI-p4QPv4BkPxHB1jfp-MqnJpcy2Ib8Hgk0sH5VKigfgIttdSghTYGwmIkTr9UrErrCo-ShVKft-CK-RHgmG8xmNkjxWxpsj3HnT10e4lnMif.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Cowboy Bebop',
    description: 'Cowboy Bebop',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABc186GvUpMtKdx7pijoM_YoxU7OzA_xOkwVzOEOua332xv_r7l7hkQlo4mi-zRiRBPZ-nrwxqAdjRRCbnr6wW-9eaxHTg9JjeSU21ocdFKpw7vntQNUQP5fcSB9gHYyOzTph-mzYOSqU0DHfyUe53Zn6pqjacC395Nx.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: "Anne With And 'E'",
    description: "Anne With And 'E'",
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABc5myow7nEszEt2TUBF8PVSg0Qh1lZAZ6wMbWArTCLw5301O36NW3CS5lKYuO33PkdLQFhGDdzv5l_EAmQQkt9BSuVVQz2j-uucmo8EX0MjLab_nXNnSZlyl3gR_4_fmtJec-v0kDW1WhXLnmL9QzIME8v3Iul2sjx3.jpg',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'Cosmic Sin',
    description: 'Cosmic Sin',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABcN0C2CGdbsvda9O4RKvtlkKyMYQbbvMF9OZtgFoFIbM-XTGq8hMl2-O4fEqypOHTWAQaGM6MioC50DnFTl7xKnfCJs8S5fhvbc-MqtmRVkzbDekIsY67kBxTiS0wzuf1L.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: '65',
    description: '65',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABcNkRZGhIW7QvYZ0iZsKHLwkgD1fkOvvZArb9U5dqtiJF0JNqsUAqo3Yh4xK-9VS1gtH2cTOcnvXl7Hl_VkJkCy6xjXTdlSoJ50-oX3dzdxAJgmcV9CdZSTXOjXFAnncMj.webp',
  },
  {
    id: uuid(),
    uuid: uuid(),
    title: 'My Hero Academia',
    description: 'My Hero Academia',
    thumbnailUrl:
      'https://glhwlvhs6fyvq6hd.public.blob.vercel-storage.com/AAAABdxZemZzIWpXC8aas3aZRYPSXi84Hr8WnBhg7j8lnX7KC5Tqd04yPpyjK9yHXUdpVDdfFcrPtmC_uRQmdOrOjQaaYTu2ugJdsYxaOEhHg05dvmirYEwEGq1otfzTxh4RxfUtGuriXoWZnKSbHklP8nszo0Ctz_uGpyWOeOI9YttGD-1cpQMA4-C2jbE26tNvrw5A0v982Yh965x3YlXcmzKMT2gh7Mjz9hSuIjtYIMC-deTi5rJ6ryvfF6ZdqK6vtVwdjGMGk5.webp',
  },
];

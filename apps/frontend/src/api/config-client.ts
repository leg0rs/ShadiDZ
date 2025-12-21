import { createClient } from '@packages/utils/src/api/client/index';

export const myApiClient = createClient({
  baseUrl: process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://legors.ru',

  fetch: async (url, init) => {
    return fetch(url, {
      ...init,
      next: {
        revalidate: 60,
        tags: ['global-api-tag'],
      },
    });
  },
});
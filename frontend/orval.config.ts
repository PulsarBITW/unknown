import {defineConfig} from 'orval';

export default defineConfig({
  apiMod: {
    input: '../backend/docs/swagger.json',
    output: {
      override: {
        mutator: {
          path: './src/shared/api/apiClient.ts',
          name: 'customInstance',
        },
      },
      target: './src/shared/api/requests.ts',
    },
  },
});

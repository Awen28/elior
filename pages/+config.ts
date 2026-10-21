import type { Config } from 'vike/types';

export default {
  prerender: { noExtraDir: true, parallel: false },
  clientRouting: false,
} satisfies Config;

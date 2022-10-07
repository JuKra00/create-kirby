import sveltePreprocess from "svelte-preprocess";

export default {
  preprocess: sveltePreprocess({
    scss: {
      prependData: `@import 'frontend/styles/global.scss';`,
    },
  }),
};

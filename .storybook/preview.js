import '../src/stories/fonts.css';
import '../src/stories/tokens.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
      config: {
        rules: [
          {
            id: 'scrollable-region-focusable',
            selector: '*:not(pre.stack)',
          },
        ],
      },
    }
  },
};

export default preview;

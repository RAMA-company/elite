import { minify } from 'html-minifier-terser';
import cssnano from 'cssnano';
import postcss from 'postcss';

export const optimizeHTML = (html) => {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
};

export const minifyCSS = async (css) => {
  const result = await postcss([cssnano]).process(css, { from: undefined });
  return result.css;
};

import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'CursorComponents',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true,
    },
    {
      file: 'dist/index.appscript.js',
      format: 'iife',
      name: 'CursorComponents',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true,
    }
  ],
  plugins: [
    peerDepsExternal(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
  ],
  external: ['react', 'react-dom'],
};
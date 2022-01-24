import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import replace from '@rollup/plugin-replace';
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default [
  {
    input: "src/dev.tsx",
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' )
      }),
      postcss({
        extensions: [".css"],
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      serve({
        open: true,
        verbose: true,
        contentBase: ["public", "dist"],
        host: "localhost",
        port: 3000,
      }),
      livereload({ watch: "dist" }),
    ],
  }
];
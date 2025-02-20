import eslint from "@eslint/js";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactCompiler from 'eslint-plugin-react-compiler'

export default [
  {
    ignores: ['dist'],
  },
  eslint.configs.recommended,
  {
    plugins: {
      "react-hooks": hooksPlugin,
      "react-compiler": reactCompiler,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
    }
  }
];
module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "jsx": true,
      "experimentalObjectRestSpread": true,
      "legacyDecorators": true
    }
  },
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["./webpack.config.babel.js"]}],
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "no-plusplus": "off",
    "no-prototype-builtins": "off",
    "object-curly-spacing": ["warn", "never", {"objectsInObjects": false, "arraysInObjects": false}],
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "eqeqeq": "off",
    "dot-notation": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "props|context|e", "varsIgnorePattern": "s" }],
    "no-undef": "error",
    "no-useless-escape": "off"
  },
  "settings": {
    "react": {
        "version": require('./package.json').dependencies.react
    }
  },
  "plugins": [
    "react",
    "import",
    "react-hooks"
  ]
}

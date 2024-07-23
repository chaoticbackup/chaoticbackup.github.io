module.exports = {
    presets: [
        '@babel/preset-typescript',
        ['@babel/preset-env', { loose: true }],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-transform-computed-properties',  { loose: true }],
    ],
}

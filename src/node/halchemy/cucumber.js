let parameters = [
    '../../features/**/*.feature',
    '--require-module ts-node/register',
    '--require src/__tests__/**/*.ts',
].join(' ')

module.exports = {
    default: parameters
}

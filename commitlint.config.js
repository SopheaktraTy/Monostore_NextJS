module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
        parserOpts: {
            headerPattern: /^\[(\w+)\]:\s(.+)$/,
            headerCorrespondence: ['type', 'subject']
        }
    },
    rules: {
        'type-case': [0],
        'subject-case': [0]
    }
};
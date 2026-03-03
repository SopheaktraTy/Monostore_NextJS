module.exports = {
    types: [
        { value: 'feat', name: '[feat]:     A new feature' },
        { value: 'fix', name: '[fix]:      A bug fix' },
        { value: 'build', name: '[build]:    Changes that affect the build system or external dependencies' },
        { value: 'docs', name: '[docs]:     Documentation only changes' },
        { value: 'style', name: '[style]:    Changes that do not affect the meaning of the code' },
        { value: 'refactor', name: '[refactor]: A code change that neither fixes a bug nor adds a feature' },
        { value: 'perf', name: '[perf]:     A code change that improves performance' },
        { value: 'test', name: '[test]:     Adding missing tests or correcting existing tests' },
        { value: 'chore', name: '[chore]:    Other changes that don\'t modify src or test files' },
        { value: 'revert', name: '[revert]:   Reverts a previous commit' },
        { value: 'ci', name: '[ci]:       Changes to our CI configuration files and scripts' }
    ],

    // Empty list allows for free-text entry since allowCustomScopes is true
    scopes: [],

    messages: {
        type: "Select the type of change that you're committing:",
        scope: '\nDenote the SCOPE of this change (optional):',
        customScope: 'Denote the SCOPE of this change:',
        subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
        body: 'Provide a LONGER description of the change (optional). Use "|" to break new lines:\n',
        breaking: 'List any BREAKING CHANGES (optional):\n',
        footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?'
    },

    allowCustomScopes: true,
    subjectLimit: 100
};
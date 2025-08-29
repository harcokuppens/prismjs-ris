(function (Prism) {

    // RIS format is simple: a two-letter tag, followed by two spaces, a hyphen,
    // and a value.
    // Example: TY  - BOOK
    // Some tags, like TY (Type of Reference), can be treated specially.

    // A pattern for the common RIS tag structure, updated to include
    // tags with a letter and a number.
    var risTagPattern = /^\s*[A-Z][A-Z0-9]\s\s-.*$/m;

    Prism.languages.ris = {
        'comment': {
            // RIS comments start with //
            pattern: /^\s*\/\/.*/m,
            greedy: true
        },
        'ty-tag': {
            // The TY tag is a special case for the reference type.
            pattern: /^\s*TY\s\s-.*/m,
            inside: {
                'tag': /^\s*TY\s\s-/,
                'value': /.+/
            }
        },
        'er-tag': {
            // The ER tag is another special case for the end of reference.
            pattern: /^\s*ER\s\s-.*/m,
            inside: {
                'tag': /^\s*ER\s\s-/,
                'value': /.+/
            }
        },
        'tag': {
            // General two-character tags, now allowing a letter and a number.
            pattern: /^\s*[A-Z][A-Z0-9]\s\s-/m,
            alias: 'keyword'
        },
        'string': {
            // Catch-all for the rest of the line, which is the value.
            pattern: risTagPattern,
            greedy: true,
            inside: {
                'tag': /^\s*[A-Z][A-Z0-9]\s\s-/,
                'value': /.+/
            }
        }
    };

    // To ensure the TY and ER tags are prioritized over the general tag.
    Prism.languages.insertBefore('ris', 'tag', {
        'ty-tag': Prism.languages.ris['ty-tag'],
        'er-tag': Prism.languages.ris['er-tag']
    });

}(Prism));


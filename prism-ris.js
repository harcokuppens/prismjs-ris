(function (Prism) {

    // RIS format is simple: a two-letter tag, followed by two spaces, a hyphen,
    // and a value.
    // Example: TY  - BOOK
    // Some tags, like TY (Type of Reference), can be treated specially.

    // A pattern for the common RIS tag structure.
    var risTagPattern = /^\s*[A-Z]{2}\s\s-.*$/m;

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
        'tag': {
            // General two-letter tags.
            pattern: /^\s*[A-Z]{2}\s\s-/m,
            alias: 'keyword'
        },
        'string': {
            // Catch-all for the rest of the line, which is the value.
            pattern: risTagPattern,
            greedy: true,
            inside: {
                'tag': /^\s*[A-Z]{2}\s\s-/,
                'value': /.+/
            }
        }
    };

    // To ensure the TY tag is prioritized over the general tag.
    Prism.languages.insertBefore('ris', 'tag', {
        'ty-tag': Prism.languages.ris['ty-tag']
    });

}(Prism));


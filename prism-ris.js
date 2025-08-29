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
            // Updated to match a wider variety of comment-starting characters
            // including #, %, //, --, _, ___, and //-.
            pattern: /^\s*(?:#|%|\/\/|--|_|___|\/\/-).*/m,
            greedy: true
        },
        'ty-tag': {
            // The TY tag is a special case for the reference type.
            pattern: /^\s*TY\s\s-.*/m,
            inside: {
                'tag': /^\s*TY\s\s-/,
                'value': {
                    pattern: /.+/,
                    // Alias the value as a 'string' so Prism themes will color it
                    // accordingly.
                    alias: 'string'
                }
            }
        },
        'er-tag': {
            // The ER tag is a special case for the end of reference.
            pattern: /^\s*ER\s\s-.*/m,
            inside: {
                'tag': /^\s*ER\s\s-/,
                'value': /.+/
            }
        },
        'title-tag': {
            // Specific tags for titles: TI, T1, TT
            pattern: /^\s*(TI|T1|TT)\s\s-.*/m,
            inside: {
                'tag': {
                    pattern: /^\s*(TI|T1|TT)\s\s-/,
                    // Alias the tag itself as a 'keyword' to match the style
                    // of other general tags.
                    alias: 'keyword'
                },
                'value': {
                    pattern: /.+/,
                    // Alias the value as a 'constant' for a different color that
                    // is also theme-dependent.
                    alias: 'constant'
                }
            }
        },
        'tag': {
            // General two-character tags.
            pattern: /^\s*[A-Z][A-Z0-9]\s\s-/m,
            alias: 'keyword'
        }
    };

    // To ensure the specific tags are prioritized over the general tag.
    Prism.languages.insertBefore('ris', 'tag', {
        'ty-tag': Prism.languages.ris['ty-tag'],
        'er-tag': Prism.languages.ris['er-tag'],
        'title-tag': Prism.languages.ris['title-tag']
    });

}(Prism));

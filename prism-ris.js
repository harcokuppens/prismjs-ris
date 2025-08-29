(function (Prism) {

    // RIS format is simple: a two-letter tag, followed by two spaces, a hyphen,
    // and a value.
    // Example: TY  - BOOK
    // Some tags, like TY (Type of Reference), can be treated specially.

    // Here are some of the most common and useful aliases you can use:
    //
    //  comment: For code comments.
    //  string: For string literals.
    //  number: For numeric values.
    //  boolean: For boolean values (true, false).
    //  operator: For operators like +, -, =, and &&.
    //  punctuation: For symbols like commas, periods, parentheses, and brackets.
    //  operator: For variable names.
    //  function: For function names.
    //  class-name: For class or type names.

    Prism.languages.ris = {
        'ty-tag': {
            // The TY tag is a special case for the reference type.
            pattern: /^\s*TY\s\s-.*/m,
            alias: 'variable',
            inside: {
                'tag': {
                    pattern: /^\s*TY\s\s-/,
                    alias: 'number'
                },
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
                'tag': {
                    pattern: /^\s*ER\s\s-/,
                    alias: 'number'
                },
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
                    alias: 'variable'
                }
            }
        },
        'tag': {
            // General two-character tags.
            pattern: /^\s*[A-Z][A-Z0-9]\s\s-/m,
            alias: 'keyword'
        },
        'comment': {
            // This rule is a catch-all for any line that doesn't start with a valid tag format.
            // The negative lookahead (?!...) ensures that a line does not begin with
            // a two-letter/digit tag followed by two spaces and a hyphen.
            pattern: /^\s*(?![A-Z][A-Z0-9]\s\s-).+$/m,
            greedy: true
        }
    };

    // We're using insertBefore to make sure
    // the tag rules are tried before the general "comment" rule.
    Prism.languages.insertBefore('ris', 'comment', {
        'ty-tag': Prism.languages.ris['ty-tag'],
        'er-tag': Prism.languages.ris['er-tag'],
        'title-tag': Prism.languages.ris['title-tag'],
        'tag': Prism.languages.ris['tag']
    });


}(Prism));

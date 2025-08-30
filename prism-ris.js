(function (Prism) {

    // RIS format is simple: a two-letter tag, followed by two spaces, a hyphen,
    // and a value.
    // Example: TY  - BOOK
    // Some tags, like TY (Type of Reference), can be treated specially.

    Prism.languages.ris = {

        'multi-line-tag': {
            // This rule now handles the tags that can have multi-line values,
            // including titles.
            // It matches the tag and then everything that follows until a new tag is found.
            // It does match  all tags except ER, TY, TI,T1, or TT tags, because
            // these are handled special.
            // note: we could not match these special tags before this multi-line-tag,
            //       because when they are matched then they are removed from the text, 
            //       and then the positive lookahead for a tag in the regex for a
            //       multi-line-tag will not match anymore.  
            pattern: /^\s*(?!ER|TY|TI|T1|TT)[A-Z][A-Z0-9]\s\s-\s*(?:.|\n)*?(?=\n\s*[A-Z][A-Z0-9]\s\s-)/m,
            inside: {
                'tag': {
                    pattern: /^\s*[A-Z][A-Z0-9]\s\s-/,
                    alias: 'keyword'
                },
                'value': {
                    pattern: /(?:.|\n)*/m,
                    // alias: 'variable'
                }
            }
        },
        'ty-tag': {
            // The TY tag is a special case for the reference type.
            pattern: /^\s*TY\s\s-.*/m,
            inside: {
                'tag': /^\s*TY\s\s-/,
                'value': {
                    pattern: /.*/,
                    // Alias the value as a 'string' so Prism themes will color it
                    // accordingly.
                    alias: 'string'
                }
            }
        },
        'er-tag': {
            // The ER tag is a special case for the end of reference.
            pattern: /^\s*ER\s\s-/m,
            inside: {
                'tag': /^\s*ER\s\s-/,
                'value': /.+/
            }
        },
        'title-tag': {
            // Specific tags for titles: TI, T1, TT
            // All other tags are already matched, and because the title tag
            // is not the last tag in an publication entry, it means,
            // that there will not be any text after it to be matched,
            // because the tag after it is already matched and removed, 
            // leaving the end of the title value at the end of the text.
            // So we just have to match all text in possible mutliple lines
            // after the tag as the title's value.
            pattern: /^\s*(TI|T1|TT)\s\s-(?:.|\n)*/m,
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

        // all tags are matched, what rests is all comment
        'comment': {
            // This powerful comment rule matches everything that is not a tag block.
            // It acts as a catch-all for the beginning of the file, between records, and at the end of the file.
            // It works by matching any text greedily until it sees a new tag or the end of the file.
            pattern: /.+/mg,
            alias: 'comment'
        }
    };

}(Prism));

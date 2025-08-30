PrismJS-RIS
========

[![npm package](https://img.shields.io/npm/v/prismjs-ris?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/prismjs-ris)
[![jsDelivr hits](https://img.shields.io/jsdelivr/npm/hm/prismjs-ris?color=gold&logo=javascript&style=for-the-badge)](https://www.jsdelivr.com/package/npm/prismjs-ris)

A [RIS] language extension for [PrismJS].

## Example

An example of the main version of syntax highlighting of RIS source code is shown [here.](https://raw.githack.com/harcokuppens/prismjs-ris/main/example.html)

## Usage

### In HTML

Simply import the `prism-ris.min.js` (recommended at the end of `body`):

```html
<script src="https://cdn.jsdelivr.net/npm/prismjs-ris@1.0.2/prism-ris.min.js">
</script>
```

Remember to import the PrismJS stylesheets and scripts **before** importing this extension.
For example:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-solarizedlight.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js">
</script>
<script src="https://cdn.jsdelivr.net/npm/prismjs-ris@1.0.2/prism-ris.min.js">
</script>
```

### In NodeJS

1. Add the package to your project:

    ```console
    $ npm install prismjs-ris
    ```

2. Import `prismjs-ris` your .js file, after Prism:

    ```js
    import Prism from 'prismjs';
    import 'prismjs-ris';
    ```



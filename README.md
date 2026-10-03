# @itslil/remark-breaks



Official [`remark-breaks@4.0.0`](https://github.com/remarkjs/remark-breaks) algorithms rewritten in LilScript. Full test suite 20/20. Not affiliated with upstream.

**Site:** [yeargun.github.io/remark-breakslil/](https://yeargun.github.io/remark-breakslil/)

```sh
npm install @itslil/remark-breaks
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. Public and extern property names are preserved; eligible internal owned properties may be mangled. ESM export names stay so the lane is testable. |

You publish the library lane. `dist/remark-breaks.closed.js` is diagnostic only.

The LilScript compiler lives next door at `../lilscript`.


## Comparison with the original

See [COMPARISON.md](COMPARISON.md) for current size and build-time comparisons against minified upstream.

[Download the checked repository package](https://yeargun.github.io/remark-breakslil/downloads/package.tgz) · [Package files, hashes and validation](https://yeargun.github.io/remark-breakslil/package-build.json). npm publication is independent.

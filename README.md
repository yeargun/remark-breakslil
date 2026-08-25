# @itslil/remark-breaks

remark-breaks reimplemented in LilScript. This is **not** the official [`remark-breaks`](https://github.com/remarkjs/remark-breaks) package.

**Site:** [yeargun.github.io/remark-breakslil/](https://yeargun.github.io/remark-breakslil/)

```sh
npm install @itslil/remark-breaks
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/remark-breaks.closed.js`.

The LilScript compiler lives next door at `../lilscript`.

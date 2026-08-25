import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const closedPath = resolve(root, "dist/remark-breaks.closed.js")

describe("@itslil/remark-breaks closed lane", () => {
  it("ships a closed artifact whose exports stay callable", async () => {
    assert.equal(existsSync(closedPath), true, "dist/remark-breaks.closed.js")
    const closed = await import(pathToFileURL(closedPath).href)
    assert.equal(typeof closed.remarkBreaks, "function")
    assert.equal(closed.default, closed.remarkBreaks)
    const tree = {
      type: "root",
      children: [{ type: "paragraph", children: [{ type: "text", value: "a\nb" }] }],
    }
    const transform = closed.remarkBreaks.call({})
    transform(tree)
    assert.equal(tree.children[0].children[1].type, "break")
  })
})

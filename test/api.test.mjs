import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = readFileSync(resolve(root, "dist/remark-breaks.esm.js"), "utf8")
const { remarkBreaks, default: remarkBreaksDefault } = await import(
  new URL("../dist/remark-breaks.esm.js", import.meta.url)
)

function paragraphTree(value) {
  return {
    type: "root",
    children: [{ type: "paragraph", children: [{ type: "text", value }] }],
  }
}

describe("@itslil/remark-breaks", () => {
  it("exports remarkBreaks and default", () => {
    assert.equal(typeof remarkBreaks, "function")
    assert.equal(remarkBreaksDefault, remarkBreaks)
    assert.match(source, / as remarkBreaks[},]/)
    assert.match(source, / as default[},]/)
  })

  it("keeps tree field names as string data", () => {
    assert.match(source, /"type"/)
    assert.match(source, /"break"/)
    assert.match(source, /"text"/)
  })

  it("splits text on newlines into text / break / text", () => {
    const tree = paragraphTree("a\nb")
    const transform = remarkBreaks.call({})
    const out = transform(tree)
    assert.equal(out, undefined)
    const kids = tree.children[0].children
    assert.equal(kids.length, 3)
    assert.equal(kids[0].type, "text")
    assert.equal(kids[0].value, "a")
    assert.equal(kids[1].type, "break")
    assert.equal(kids[2].type, "text")
    assert.equal(kids[2].value, "b")
  })

  it("does not split inside code or inlineCode", () => {
    const tree = {
      type: "root",
      children: [
        { type: "code", value: "a\nb" },
        { type: "paragraph", children: [{ type: "inlineCode", value: "a\nb" }] },
      ],
    }
    remarkBreaks.call({})(tree)
    assert.equal(tree.children[0].value, "a\nb")
    assert.equal(tree.children[1].children[0].type, "inlineCode")
    assert.equal(tree.children[1].children[0].value, "a\nb")
  })

  it("works through processor.use(plugin)", () => {
    const tree = paragraphTree("x\ny")
    const processor = {
      use(plugin) {
        return plugin.call(this)
      },
    }
    const transform = processor.use(remarkBreaks)
    transform(tree)
    assert.equal(tree.children[0].children[1].type, "break")
  })
})

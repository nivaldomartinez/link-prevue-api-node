import * as cheerio from "cheerio"
import { getByProp, isValidHttpUrl } from "./utils"

describe("isValidHttpUrl", () => {
  test("accept valid URLs http/https", () => {
    expect(isValidHttpUrl("https://example.com")).toBe(true)
    expect(isValidHttpUrl("http://example.com")).toBe(true)
  })

  test("should reject no http or https", () => {
    expect(isValidHttpUrl("mailto:test@test.com")).toBe(false)
    expect(isValidHttpUrl("javascript:alert(1)")).toBe(false)
    expect(isValidHttpUrl("ftp://example.com")).toBe(false)
  })

  test("should reject garbage", () => {
    expect(isValidHttpUrl("notaurl")).toBe(false)
    expect(isValidHttpUrl("http:/broken")).toBe(false)
  })
})

describe("getByProp", () => {
  test("returns content from meta[name]", () => {
    const html = `
      <html>
        <head>
          <meta name="description" content="Description from name">
        </head>
      </html>
    `
    const $ = cheerio.load(html)

    const result = getByProp($, "description")

    expect(result).toBe("Description from name")
  })

  test("returns content from meta[property] when meta[name] is missing", () => {
    const html = `
      <html>
        <head>
          <meta property="og:title" content="Title from property">
        </head>
      </html>
    `
    const $ = cheerio.load(html)

    const result = getByProp($, "og:title")

    expect(result).toBe("Title from property")
  })

  test("prefers meta[name] over meta[property] when both exist", () => {
    const html = `
      <html>
        <head>
          <meta name="og:title" content="Title from name">
          <meta property="og:title" content="Title from property">
        </head>
      </html>
    `
    const $ = cheerio.load(html)

    const result = getByProp($, "og:title")

    expect(result).toBe("Title from name")
  })

  test("returns null when meta tag is missing", () => {
    const html = `
      <html>
        <head></head>
      </html>
    `
    const $ = cheerio.load(html)

    const result = getByProp($, "description")

    expect(result).toBeNull()
  })

  test("returns first meta tag when multiple are present", () => {
    const html = `
      <html>
        <head>
          <meta name="description" content="First description">
          <meta name="description" content="Second description">
        </head>
      </html>
    `
    const $ = cheerio.load(html)

    const result = getByProp($, "description")

    expect(result).toBe("First description")
  })

  test("returns null when meta tag exists without content attribute", () => {
    const html = `
      <html>
        <head>
          <meta name="description">
        </head>
      </html>
    `
    const $ = cheerio.load(html)

    const result = getByProp($, "description")

    expect(result).toBeNull()
  })
})

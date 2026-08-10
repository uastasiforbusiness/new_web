import { describe, expect, it } from "vitest";

const { buildPageMeta, productSchema, breadcrumbSchema, localBusinessSchema, SITE } =
  await import("../seo");

describe("buildPageMeta", () => {
  it("suffixes non-homepage titles with the site name", () => {
    const meta = buildPageMeta({ title: "Fleet", description: "d", path: "/fleet" });
    expect(meta.title).toBe("Fleet | B LEADER");
    expect(buildPageMeta({ title: "Home", description: "d", path: "/" }).title).toBe("Home");
  });

  it("builds a canonical URL from metadataBase and path", () => {
    const meta = buildPageMeta({ title: "Fleet", description: "d", path: "/fleet" });
    expect(meta.metadataBase.href).toBe("https://bleaderitaly.com/");
    expect(meta.alternates.canonical).toBe("/fleet");
    expect(meta.openGraph.url).toBe("https://bleaderitaly.com/fleet");
  });

  it("defaults description and keywords when the page provides none", () => {
    const meta = buildPageMeta({ title: "Fleet", path: "/fleet" });
    expect(meta.description).toBe(SITE.defaultDescription);
    expect(meta.keywords).toEqual(SITE.defaultKeywords);
  });

  it("merges page keywords after defaults", () => {
    const meta = buildPageMeta({ title: "Fleet", path: "/fleet", keywords: ["custom"] });
    expect(meta.keywords).toEqual([...SITE.defaultKeywords, "custom"]);
  });

  it("sets noindex robots when requested", () => {
    const meta = buildPageMeta({ title: "T", path: "/hidden", noIndex: true });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("uses a page-specific ogImage when provided", () => {
    const meta = buildPageMeta({ title: "T", path: "/fleet", ogImage: "/og/fleet.png" });
    expect(meta.openGraph.images[0].url).toBe("/og/fleet.png");
    expect(meta.twitter.images[0]).toBe("/og/fleet.png");
  });
});

describe("schema helpers", () => {
  it("productSchema marks rental offers with UnitPriceSpecification per day", () => {
    const schema = productSchema({
      name: "Ferrari California",
      brand: "Ferrari",
      category: "Car",
      image: "/car.jpg",
      description: "d",
      pricePerDay: 1200,
    });
    expect(schema["@type"]).toBe("Product");
    expect(schema.offers.price).toBe(1200);
    expect(schema.offers.priceSpecification).toEqual({
      "@type": "UnitPriceSpecification",
      unitText: "DAY",
      price: 1200,
    });
  });

  it("breadcrumbSchema numbers positions from 1", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Fleet", path: "/fleet" },
    ]);
    expect(schema.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(schema.itemListElement[1].item).toBe("https://bleaderitaly.com/fleet");
  });

  it("localBusinessSchema targets Salento with EUR pricing tier", () => {
    const schema = localBusinessSchema();
    expect(schema["@type"]).toEqual(["Organization", "LocalBusiness"]);
    expect(schema.address.addressCountry).toBe("IT");
    expect(schema.areaServed.map((a) => a.name)).toContain("Lecce");
  });
});

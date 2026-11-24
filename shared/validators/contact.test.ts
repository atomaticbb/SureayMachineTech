import { describe, expect, it } from "vitest";
import { ContactFormSchema } from "./contact";

const inquiry = {
  email: "buyer@example.com",
  message: "Please quote the attached drawing.",
};

describe("contact form fields", () => {
  it("combines trimmed first and last names and preserves optional details", () => {
    expect(
      ContactFormSchema.parse({
        ...inquiry,
        firstName: "  Jamie  ",
        lastName: "  Smith  ",
        phone: " +44 20 1234 5678 ",
        company: " Example Manufacturing ",
        productName: " Granulator blades ",
      })
    ).toMatchObject({
      name: "Jamie Smith",
      firstName: "Jamie",
      lastName: "Smith",
      phone: "+44 20 1234 5678",
      company: "Example Manufacturing",
      productName: "Granulator blades",
    });
  });

  it.each([
    [{ firstName: "Jamie" }, "lastName"],
    [{ lastName: "Smith" }, "firstName"],
    [{ firstName: " ", lastName: "Smith" }, "firstName"],
    [{ firstName: "Jamie", lastName: "\t" }, "lastName"],
    [{ firstName: "", lastName: "" }, "firstName"],
    [{ firstName: "x".repeat(51), lastName: "Smith" }, "firstName"],
    [{ firstName: "Jamie", lastName: "x".repeat(51) }, "lastName"],
  ])("rejects incomplete or oversized split names: %j", (names, field) => {
    const result = ContactFormSchema.safeParse({ ...inquiry, ...names });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: [field] })])
    );
  });

  it("accepts the new format without optional phone, company or product", () => {
    const data = ContactFormSchema.parse({
      ...inquiry,
      firstName: "Jamie",
      lastName: "Smith",
    });
    expect(data.name).toBe("Jamie Smith");
    expect(data.phone).toBeUndefined();
    expect(data.company).toBeUndefined();
    expect(data.productName).toBeUndefined();
  });

  it("preserves legacy full-name and email-only forms", () => {
    expect(
      ContactFormSchema.parse({ ...inquiry, name: "Jamie Smith" }).name
    ).toBe("Jamie Smith");
    expect(ContactFormSchema.parse(inquiry).name).toBeUndefined();
  });

  it("allows 1000 message characters independently of product context", () => {
    const payload = {
      ...inquiry,
      firstName: "Jamie",
      lastName: "Smith",
      productName: "Granulator blades",
      message: "x".repeat(1000),
    };
    expect(ContactFormSchema.parse(payload).message).toHaveLength(1000);
    expect(
      ContactFormSchema.safeParse({ ...payload, message: "x".repeat(1001) })
        .success
    ).toBe(false);
  });
});

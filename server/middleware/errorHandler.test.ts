import { describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import { ContactFormSchema } from "../../shared/validators/contact";
import { errorHandler } from "./errorHandler";

describe("contact validation errors", () => {
  it("returns field-level Zod 4 issues for an invalid inquiry", () => {
    const result = ContactFormSchema.safeParse({ email: "invalid", message: "" });
    expect(result.success).toBe(false);
    if (result.success) return;
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });
    errorHandler(result.error, {} as Request, { status } as unknown as Response, vi.fn());
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({
      errors: expect.arrayContaining([
        expect.objectContaining({ field: "email" }),
        expect.objectContaining({ field: "message" }),
      ]),
    }));
  });
});

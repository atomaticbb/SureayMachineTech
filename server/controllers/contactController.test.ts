import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";

const { create, sendContactEmail, sendCustomerConfirmationEmail } = vi.hoisted(
  () => ({
    create: vi.fn(),
    sendContactEmail: vi.fn(),
    sendCustomerConfirmationEmail: vi.fn(),
  })
);

vi.mock("../db/client.js", () => ({ prisma: { contact: { create } } }));
vi.mock("../services/emailService.js", () => ({
  sendContactEmail,
  sendCustomerConfirmationEmail,
}));

import { submitContactForm } from "./contactController";

beforeEach(() => {
  vi.clearAllMocks();
  create.mockResolvedValue({ id: "test-contact" });
  sendContactEmail.mockResolvedValue({ success: true });
  sendCustomerConfirmationEmail.mockResolvedValue({ success: true });
});

function request(body: Record<string, string>) {
  return {
    body,
    headers: { "user-agent": "contact-test" },
    ip: "127.0.0.1",
    socket: { remoteAddress: "127.0.0.1" },
  } as Request;
}

describe("contact submission data", () => {
  it("keeps the product and full message in storage and both email payloads", async () => {
    const body = {
      firstName: " Jamie ",
      lastName: " Smith ",
      email: "buyer@example.com",
      phone: "+44 20 1234 5678",
      company: "Example Manufacturing",
      productName: "Granulator blades",
      message: "x".repeat(1000),
    };
    const expectedData = {
      name: "Jamie Smith",
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: `[Product: Granulator blades] ${body.message}`,
    };
    const json = vi.fn();
    const next = vi.fn();

    await submitContactForm(
      request(body),
      { json } as unknown as Response,
      next
    );

    expect(next).not.toHaveBeenCalled();
    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining(expectedData),
    });
    expect(sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining(expectedData),
      expect.any(Object),
      undefined
    );
    expect(sendCustomerConfirmationEmail).toHaveBeenCalledWith(
      expect.objectContaining(expectedData),
      "test-contact"
    );
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  it("rejects an incomplete new name before storing or sending anything", async () => {
    const json = vi.fn();
    const next = vi.fn();
    await submitContactForm(
      request({
        firstName: "Jamie",
        email: "buyer@example.com",
        message: "Please quote these parts.",
      }),
      { json } as unknown as Response,
      next
    );
    expect(next).toHaveBeenCalledOnce();
    expect(create).not.toHaveBeenCalled();
    expect(sendContactEmail).not.toHaveBeenCalled();
    expect(sendCustomerConfirmationEmail).not.toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });
});

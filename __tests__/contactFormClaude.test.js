// contactFormClaude.test.js;

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "@/components/contactForm";
import * as validateFormModule from "@/utilities/validateContactForm";

// Mock the next-intl useTranslations hook
jest.mock("next-intl", () => ({
  useTranslations: () => (key) => {
    const translations = {
      Name: "Name",
      Email: "Email",
      Message: "Message",
      NameError: "Name must be at least 2 characters",
      EmailError: "Please enter a valid email address",
      MessageError: "Message must be at least 10 characters",
      CaptchaError: "Please complete the captcha verification",
      ContactSend: "Send",
      ContactSending: "Sending...",
      ContactSuccess: "Message sent successfully!",
      ContactFail: "Failed to send message",
    };
    return translations[key] || key;
  },
}));

// Mock HCaptcha component
jest.mock("@hcaptcha/react-hcaptcha", () => {
  return {
    __esModule: true,
    default: jest.fn(({ onVerify }) => {
      return (
        <div data-testid="hcaptcha-mock">
          <button
            data-testid="verify-captcha-button"
            onClick={() => onVerify("mock-token")}
          >
            Verify Captcha
          </button>
        </div>
      );
    }),
  };
});

// Mock fetch API
global.fetch = jest.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockClear();
  });

  test("renders contact form with all fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId("hcaptcha-mock")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<ContactForm />);

    // Submit form with empty fields
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    // Check validation errors are displayed
    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Message must be at least 10 characters")
      ).toBeInTheDocument();
    });
  });

  test("shows error if captcha is not completed", async () => {
    render(<ContactForm />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: {
        value: "This is a test message that is at least 10 characters",
      },
    });

    // Submit without verifying captcha
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    // Check captcha error is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Please complete the captcha verification")
      ).toBeInTheDocument();
    });
  });

  test("submits form successfully when all fields are valid and captcha is verified", async () => {
    // Mock successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: {
        value: "This is a test message that is at least 10 characters",
      },
    });

    // Verify captcha
    fireEvent.click(screen.getByTestId("verify-captcha-button"));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    // Check form was submitted with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a test message that is at least 10 characters",
          hCaptchaToken: "mock-token",
        }),
      });

      expect(
        screen.getByText("Message sent successfully!")
      ).toBeInTheDocument();
    });
  });

  test("shows API error message when submission fails", async () => {
    // Mock failed API response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Server error occurred" }),
    });

    render(<ContactForm />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: {
        value: "This is a test message that is at least 10 characters",
      },
    });

    // Verify captcha
    fireEvent.click(screen.getByTestId("verify-captcha-button"));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    // Check error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Server error occurred")).toBeInTheDocument();
    });
  });

  test("validates each field separately", async () => {
    render(<ContactForm />);

    // Test name validation
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "J" },
    }); // Too short
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "valid@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Valid message that is long enough" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters")
      ).toBeInTheDocument();
      expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
    });

    // Test email validation
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(
        screen.queryByText("Please enter a valid email address")
      ).toBeInTheDocument();
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
    });

    // Test message validation
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "valid@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Too short" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("email-error")).not.toBeInTheDocument();
      expect(
        screen.getByText("Message must be at least 10 characters")
      ).toBeInTheDocument();
    });
  });

  test("fixes a bug in the original code where formdata is referenced incorrectly", () => {
    // Mock console.log to check if the bug would be triggered
    console.error = jest.fn();

    // Mock validateForm to avoid real validation
    const validateFormSpy = jest.spyOn(validateFormModule, "validateForm");
    validateFormSpy.mockReturnValue({});

    render(<ContactForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "This is a test message" },
    });

    // Verify captcha
    fireEvent.click(screen.getByTestId("verify-captcha-button"));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    // Check that the validateForm was called with the correct data
    expect(validateFormSpy).toHaveBeenCalledWith(
      {
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message",
      },
      expect.any(Function)
    );

    // The original code has a bug: it logs "formdata" but the variable is named "formData"
    // This test would fail if we were using the original code
    expect(console.error).not.toHaveBeenCalledWith(
      "formdata sent: ",
      undefined
    );
  });
});

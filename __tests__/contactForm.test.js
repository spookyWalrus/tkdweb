import ContactForm from "../src/components/contactForm";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  debug,
} from "@testing-library/react";
import "@testing-library/jest-dom";
// import { useTranslations } from "next-intl";
import { validateForm } from "@/utilities/validateForm";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});
afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
  console.warn.mockRestore();
});

jest.mock("next-intl", () => ({
  useTranslations: jest.fn((_namespace) => {
    return jest.fn((key) => key);
  }),
}));

jest.mock("@hcaptcha/react-hcaptcha", () => ({
  __esModule: true,
  default: ({ onVerify }) => (
    <button onClick={() => onVerify("mock-token")} data-testid="mock-captcha">
      Mock Captcha
    </button>
  ),
}));

test("verify trans mock", () => {
  const { useTranslations } = require("next-intl");
  const t = useTranslations("any");
  expect(t("Contact")).toBe("Contact");
});

// describe("validateForm", () => {
//   const t = jest.fn((key) => key); // simple mock translator

//   it("should return email error for invalid email", () => {
//     const formData = {
//       name: "Valid Name",
//       email: "invalid",
//       message: "Valid message with enough length",
//     };

//     const errors = validateForm(formData, t);
//     expect(errors.email).toBe("EmailError");
//     expect(t).toHaveBeenCalledWith("EmailError");
//   });

//   it("should return no errors for valid form", () => {
//     const formData = {
//       name: "Valid Name",
//       email: "valid@example.com",
//       message: "Valid message with enough length",
//     };

//     const errors = validateForm(formData, t);
//     expect(errors).toEqual({});
//   });
// });

describe("test full contact form", () => {
  test("show error when email  is invalid", async () => {
    const { container } = render(<ContactForm />);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "" } });
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "aa" } });
    const messageInput = screen.getByLabelText(/message/i);
    fireEvent.change(messageInput, {
      target: { value: "This" },
    });

    fireEvent.click(screen.getByTestId("mock-captcha"));
    const submitButton = screen.getByRole("button", { name: /ContactSend/i });
    // fireEvent.submit(screen.getByType("submit"));
    fireEvent.click(submitButton);

    console.log("DOM after form submission:");
    screen.debug();
    // console.log(
    //   "Errors state:",
    //   container.querySelector('[data-testid="errors"]')?.innerHTML
    // );
    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      expect(screen.getByText("EmailError")).toBeInTheDocument();
    });
    // const { validateForm } = require("@/utilities/validateForm");
    // expect(validateForm).toHaveBeenCalled();
  });
});

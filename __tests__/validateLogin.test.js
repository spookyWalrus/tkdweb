import { validateLogin } from "@/utilities/validateLogin.js";

const login = validateLogin;

describe("test login form", () => {
  const t = (key) => key;

  test("email error, no @ + .com", () => {
    const errors = login({ email: "dudemail" }, t);
    expect(errors).toHaveProperty("email", "EmailError");
  });
  test("email error, no .com", () => {
    const errors = login({ email: "dudemail@mail" }, t);
    expect(errors).toHaveProperty("email", "EmailError");
  });
  test("email error, no @", () => {
    const errors = login({ email: "dudemail.mail" }, t);
    expect(errors).toHaveProperty("email", "EmailError");
  });

  test("password error, too short", () => {
    const errors = login({ password: "passwo" }, t);
    expect(errors).toHaveProperty("pw", "PWError");
  });
  test("password error, no symbols", () => {
    const errors = login({ password: "password1" }, t);
    expect(errors).toHaveProperty("pw", "PWError");
  });
  test("password error, no number", () => {
    const errors = login({ password: "password!" }, t);
    expect(errors).toHaveProperty("pw", "PWError");
  });
});

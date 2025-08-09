import { _testExports } from "@/utilities/validateContactForm";
const { validateForm } = _testExports;

describe("checking validateForm function", () => {
  const t = (key) => key;

  test("email error", () => {
    const errors = validateForm({ email: "dude" }, t);
    expect(errors).toHaveProperty("email", "EmailError");
  });

  test("name error", () => {
    const errors = validateForm({ name: "a" }, t);
    expect(errors).toHaveProperty("name", "NameError");
  });
});

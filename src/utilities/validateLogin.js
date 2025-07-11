export const validateLogin = (data, t) => {
  const newErrors = {};
  if (!data.email) {
    newErrors.email = t("EmailRequired") || "Email required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = t("EmailError") || "Invalid email";
  }

  if (!data.password) {
    newErrors.password = t("PasswordRequired") || "Password required";
  } else {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_=+{};:,<.>/?\\|~`'"[\]-]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      newErrors.password = t("PWError") || "Invalid password";
    }
  }
  if (!data.name) {
    newErrors.name = t("NameRequired") || "Name required";
  } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(data.name)) {
    newErrors.name = t("NameError") || "Please enter first and last name";
  }

  return newErrors;
};

export const validateLogin = (data, t) => {
  const newErrors = {};
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    return (newErrors.email = t("EmailError"));
  }
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_=+{};:,<.>/?\\|~`'"[\]-]).{8,}$/;
  if (data.pw && !passwordRegex.test(data.pw)) {
    return (newErrors.pw = t("PWError"));
  }

  return newErrors;
};

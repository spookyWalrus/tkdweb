export const validateContactForm = (data, t) => {
  const newErrors = {};
  if (!data.name || data.name.length < 2) {
    newErrors.name = t("NameError");
  }
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = t("EmailError");
  }
  if (!data.message || data.message.length < 10) {
    newErrors.message = t("MessageError");
  }

  return newErrors;
};

export const _testExports = { validateContactForm };

export const validateLogin = (data, t, action) => {
  // console.log("checking validation input: ", data, t, action);
  const newErrors = {};
  if (action === "pwrecovery") {
    if (!data.email) {
      newErrors.email = t("EmailError") || "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = t("EmailError") || "Email invalid";
    }
    return newErrors;
  }
  if (action === "pwreset") {
    if (!data.passwordrepeat) {
      newErrors.password = t("PWError") || "Password required";
    } else {
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_=+{};:,<.>/?\\|~`'"[\]-]).{8,}$/;
      if (!passwordRegex.test(data.passwordrepeat)) {
        newErrors.password = t("PWError") || "Password invalid";
      }
    }
    return newErrors;
  }

  if (action === "signup") {
    //checks if script used for login or signup
    if (!data.name) {
      newErrors.name = t("NameError") || "Name required";
      // } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(data.name)) {
    } else if (!/^[a-zA-ZÀ-ÿ]+$/.test(data.name)) {
      newErrors.name = t("NameError") || "Please enter first name";
    }
    if (!data.lastname) {
      newErrors.lastname = "Last Name required";
    } else if (!/^[a-zA-ZÀ-ÿ]+(?:[-' ]?[a-zA-ZÀ-ÿ]+)*$/.test(data.lastname)) {
      newErrors.lastname = "Please enter last name";
    }
    if (!data.email) {
      newErrors.email = t("EmailError") || "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = t("EmailError") || "Email invalid";
    }
    if (!data.password) {
      newErrors.password = t("PWError") || "Password required";
    } else {
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_=+{};:,<.>/?\\|~`'"[\]-]).{8,}$/;
      if (!passwordRegex.test(data.password)) {
        newErrors.password = t("PWError") || "Password invalid";
      }
    }
    return newErrors;
  }
  if (action === "emailupdate") {
    if (!data.name) {
      newErrors.name = t("NameError") || "Name required";
      // } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(data.name)) {
    } else if (!/^[a-zA-ZÀ-ÿ]+$/.test(data.name)) {
      newErrors.name = t("NameError") || "Please enter first name";
    }
    if (!data.lastname) {
      newErrors.lastname = "Last Name required";
    } else if (!/^[a-zA-ZÀ-ÿ]+(?:[-' ]?[a-zA-ZÀ-ÿ]+)*$/.test(data.lastname)) {
      newErrors.lastname = "Please enter last name";
    }
    if (!data.email) {
      newErrors.email = t("EmailError") || "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = t("EmailError") || "Email invalid";
    }
    return newErrors;
  }
  if (action === "nameupdate") {
    if (!data.name) {
      newErrors.name = t("NameError") || "Name required";
      // } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(data.name)) {
    } else if (!/^[a-zA-ZÀ-ÿ]+$/.test(data.name)) {
      newErrors.name = t("NameError") || "Please enter first name";
    }
    if (!data.lastname) {
      newErrors.lastname = "Last Name required";
    } else if (!/^[a-zA-ZÀ-ÿ]+(?:[-' ]?[a-zA-ZÀ-ÿ]+)*$/.test(data.lastname)) {
      newErrors.lastname = "Please enter last name";
    }
    return newErrors;
  }

  if (!action) {
    // login by default
    if (!data.email) {
      newErrors.email = t("EmailError") || "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = t("EmailError") || "Email invalid";
    }
    if (!data.password) {
      newErrors.password = t("PWError") || "Password required";
    } else {
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_=+{};:,<.>/?\\|~`'"[\]-]).{8,}$/;
      if (!passwordRegex.test(data.password)) {
        newErrors.password = t("PWError") || "Password invalid";
      }
    }
    return newErrors;
  }
};

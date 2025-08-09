"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateContactForm } from "@/utilities/validateContactForm";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const t = useTranslations("Contact");
  let contactSend = t("ContactSend");
  let contactSending = t("ContactSending");
  let contactSuccess = t("ContactSuccess");
  let contactFailed = t("ContactFail");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitMail = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateContactForm(formData, t);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    const isCaptchaRequired = process.env.NODE_ENV !== "test";
    if (isCaptchaRequired && !captchaToken) {
      setErrors((prev) => ({
        ...prev,
        captcha: t("CaptchaError"),
      }));
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          hCaptchaToken: captchaToken,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
      } else {
        setStatus(contactFailed);
        setErrors({ submit: result.error || contactFailed });
      }
    } catch (error) {
      setStatus("Error on submit");
      setErrors({ submit: "Network error. Try again" });
    }
  };

  return (
    <div>
      <form onSubmit={submitMail} className="contactForm">
        <div className="field">
          <label htmlFor="name" className="formLabel">
            {t("Name")}
          </label>
          <div className="control">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Dolyo Chagi"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="help is-danger">{errors.name}</p>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="email" className="formLabel">
            {t("Email")}
          </label>
          <div className="control">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="dolyoChagi@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="help is-danger" data-testid="email-error">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="message" className="formLabel">
            {t("Message")}
          </label>
          <div className="control">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
            {errors.message && (
              <p className="help is-danger">{errors.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <div className="controL">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_FREESITE_KEY || ""}
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
            />
            {errors.captcha && (
              <p className="help is-danger">{errors.captcha}</p>
            )}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              className="button"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? contactSending : contactSend}
            </button>
            {errors.submit && <p className="help is-danger">{errors.submit}</p>}
            {status === "success" && (
              <p className="help is-success sentMessage">{contactSuccess}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

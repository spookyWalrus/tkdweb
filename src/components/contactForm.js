import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const t = useTranslations("Contact");
  let sending = t("ContactSending");
  let success = t("ContactSuccess");
  let failed = t("ContactFail");

  const submitMail = async (e) => {
    e.preventDefault();
    try {
      setStatus(sending);
      const formData = new FormData(e.target);
      formData.append("access_key", "289101d9-a5e8-4394-8ccb-5c53d469a895");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus(success);
        e.target.reset();
      } else {
        setStatus(failed);
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      setStatus("Error on submit");
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
            <input type="text" name="name" placeholder="Dolyo Chagi" required />
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
              placeholder="dolyoChagi@mail.com"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="subject" className="formLabel">
            {t("Subject")}
          </label>
          <div className="control">
            <input type="text" name="subject" required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="message" className="formLabel">
            {t("Message")}
          </label>
          <div className="control">
            <textarea name="message" required />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button" type="submit">
              {t("Send")}
            </button>
          </div>
        </div>
      </form>
      {status && (
        <div className="contactStatus">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}

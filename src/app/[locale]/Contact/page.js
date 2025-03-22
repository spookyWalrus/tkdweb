"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactUs() {
  const [status, setStatus] = useState("");
  const t = useTranslations("Contact");

  const submitMail = async (e) => {
    e.preventDefault();
    try {
      setStatus("sending mail...");
      const formData = new FormData(e.target);
      formData.append("access_key", "289101d9-a5e8-4394-8ccb-5c53d469a895");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("Email sent successfully");
        e.target.reset();
      } else {
        setStatus("Failed to send email");
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      // console.log("Error sending email: ", error);
      setStatus("error on submit");
    }
  };

  return (
    <div className="formTop">
      <h2>{t("ContactUs")}</h2>
      <form onSubmit={submitMail}>
        <label htmlFor="name">{t("Name")}</label>
        <input type="text" name="name" required />
        <label htmlFor="email">{t("Email")}</label>
        <input type="email" name="email" required />
        <label htmlFor="subject">{t("Subject")}</label>
        <input type="text" name="subject" required />
        <label htmlFor="message">{t("Message")}</label>
        <textarea name="message" required />
        <button type="submit">{t("Send")}</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

"use client";
import { useRouter, usePathname } from "next/navigation";
import PropTypes from "prop-types";
// import { useSearchParams } from "next/navigation";

function DismissibleMessage({ type, children, onDismiss }) {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  const getMessageClass = () => {
    switch (type) {
      case "success_sent":
        return "help is-success confirmLinkSent";
      case "success_profile":
        return "help is-success sentMessageMed";
      case "success_email":
        return "help is-success sentMessageMed";
      case "error":
        return "help is-error sentMessageMed";
      case "warning":
        return "help is-warn emailPartialConfirm";
      case "info":
        return "help is-info";
      default:
        return "help";
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
    // Navigate to the same pathname without search params
    if (window.location.search) {
      router.push(pathname);
    }
  };

  return (
    <div className={`${getMessageClass()} dismissible-message`}>
      <button
        onClick={handleDismiss}
        className="dismiss-button"
        aria-label="Dismiss message"
        type="button"
      >
        ×
      </button>
      <div className="message-content">{children}</div>
    </div>
  );
}

export default DismissibleMessage;

DismissibleMessage.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func,
};

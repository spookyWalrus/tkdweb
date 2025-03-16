"use client"; // Error components must be Client Components
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error); // eslint-disable-line no-console
    }
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired, // Ensures `error` is an Error object
  reset: PropTypes.func.isRequired, // Ensures `reset` is a function
};

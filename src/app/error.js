"use client";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // console.error(error);
      return () => console.error(error);
    }
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  reset: PropTypes.func.isRequired,
};

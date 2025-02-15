import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Image from "next/image";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, alt, ...props }) => (
    <Image alt={alt || ""} {...props} />
  ), // Mocking Image component as a simple <Image /> tag
}));

import Home from "../../src/app/page";

describe("Home", () => {
  it("renders a div", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Mock next/image to prevent issues with `fetchPriority` prop
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }) => <img {...props} />, // Mocking Image component as a simple <img> tag
}));

import Home from "../src/app/page";

describe("Home", () => {
  it("renders a div", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

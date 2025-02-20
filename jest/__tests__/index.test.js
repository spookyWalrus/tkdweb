import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

import Home from "../../src/app/[locale]/page";

describe("Home", () => {
  it("renders a div", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

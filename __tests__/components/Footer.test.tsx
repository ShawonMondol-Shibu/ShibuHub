import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders ShibuHub brand name", () => {
    render(<Footer />);
    expect(screen.getByText("ShibuHub")).toBeInTheDocument();
  });

  it("renders Quick Links section", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders Newsletter section", () => {
    render(<Footer />);
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});

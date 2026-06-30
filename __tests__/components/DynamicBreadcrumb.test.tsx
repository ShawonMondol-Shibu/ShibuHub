import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DynamicBreadcrumb } from "@/components/layout/DynamicBreadcrumb";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("DynamicBreadcrumb", () => {
  it("renders breadcrumb for single segment", () => {
    (usePathname as jest.Mock).mockReturnValue("/products");
    render(<DynamicBreadcrumb />);
    expect(screen.getByText("products")).toBeInTheDocument();
  });

  it("renders breadcrumb for nested segments", () => {
    (usePathname as jest.Mock).mockReturnValue("/products/123");
    render(<DynamicBreadcrumb />);
    expect(screen.getByText("products")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const { container } = render(<DynamicBreadcrumb />);
    expect(container).toMatchSnapshot();
  });
});

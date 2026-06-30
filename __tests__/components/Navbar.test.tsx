import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/components/layout/NavbarUser", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-user">NavbarUser</div>,
  };
});

jest.mock("@/components/context/contextProvider", () => ({
  userContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

jest.mock("@/components/context/AuthProvider", () => ({
  useAuth: () => ({ user: null }),
}));

jest.mock("@/lib/auth-client", () => ({
  authClient: { signOut: jest.fn() },
}));

describe("Navbar", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders ShibuHub logo text", () => {
    render(<Navbar />);
    expect(screen.getByText("ShibuHub")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Products").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("does not render Dashboard link in nav", () => {
    render(<Navbar />);
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("highlights active link", () => {
    (usePathname as jest.Mock).mockReturnValue("/products");
    render(<Navbar />);
    const productsLinks = screen.getAllByText("Products");
    expect(productsLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("matches snapshot", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});

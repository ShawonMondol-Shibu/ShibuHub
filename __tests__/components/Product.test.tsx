import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "@/components/layout/Product";
import { userContext } from "@/components/context/contextProvider";

const mockContext = {
  hearts: [],
  handleHeart: jest.fn(),
  carts: [],
  handleCart: jest.fn(),
  totalPrice: 0,
  setCarts: jest.fn(),
  handleQuantity: jest.fn(),
  handleRemoveCart: jest.fn(),
  handleRemoveHeart: jest.fn(),
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <userContext.Provider value={mockContext}>{ui}</userContext.Provider>
  );
};

describe("Product Card", () => {
  const defaultProps = {
    id: 1,
    image: "/test-image.jpg",
    title: "Test Product",
    description: "A test product description",
    price: 29.99,
  };

  it("renders product title", () => {
    renderWithContext(<Product {...defaultProps} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders product price", () => {
    renderWithContext(<Product {...defaultProps} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("renders product description", () => {
    renderWithContext(<Product {...defaultProps} />);
    expect(screen.getByText("A test product description")).toBeInTheDocument();
  });

  it("renders view details link", () => {
    renderWithContext(<Product {...defaultProps} />);
    const link = screen.getByText("View Details").closest("a");
    expect(link).toHaveAttribute("href", "/products/1");
  });

  it("calls handleHeart when heart icon clicked", () => {
    renderWithContext(<Product {...defaultProps} />);
    const heartButton = screen.getAllByRole("button")[0];
    fireEvent.click(heartButton);
    expect(mockContext.handleHeart).toHaveBeenCalledWith(
      1,
      "/test-image.jpg",
      "Test Product",
      29.99
    );
  });

  it("matches snapshot", () => {
    const { container } = renderWithContext(<Product {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "@/components/shared/empty-state";
import { Inbox } from "lucide-react";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState icon={Inbox} title="No items found" />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <EmptyState
        icon={Inbox}
        title="No items"
        description="Add some items to get started"
      />
    );
    expect(screen.getByText("Add some items to get started")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    const onClick = jest.fn();
    render(
      <EmptyState
        icon={Inbox}
        title="Empty"
        action={{ label: "Add Item", onClick }}
      />
    );
    const button = screen.getByText("Add Item");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not render action button when not provided", () => {
    render(<EmptyState icon={Inbox} title="Empty" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<EmptyState icon={Inbox} title="Empty" />);
    expect(container).toMatchSnapshot();
  });
});

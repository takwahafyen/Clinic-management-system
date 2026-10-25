import { render, screen } from "@testing-library/react";
import { SkeletonCard, SkeletonGrid } from "./SkeletonCard";

describe("Skeleton Loading Component", () => {
  it("renders a single skeleton card with shimmer structure", () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector(".skeleton-card")).toBeInTheDocument();
    expect(container.querySelector(".skeleton-avatar")).toBeInTheDocument();
  });

  it("renders a skeleton grid with requested count and accessible role", () => {
    render(<SkeletonGrid count={4} />);
    const grid = screen.getByRole("status", { name: /loading clinical records/i });
    expect(grid).toBeInTheDocument();
    expect(grid.querySelectorAll(".skeleton-card")).toHaveLength(4);
  });
});

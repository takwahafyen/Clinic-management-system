import { render, screen, within } from "@testing-library/react";
import { SkeletonCard, SkeletonGrid } from "./SkeletonCard";

describe("Skeleton Loading Component", () => {
  it("renders a single skeleton card with shimmer structure", () => {
    render(<SkeletonCard />);
    const card = screen.getByTestId('skeleton-card');
    const avatar = screen.getByTestId('skeleton-avatar');
    expect(card).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  it("renders a skeleton grid with requested count and accessible role", () => {
    render(<SkeletonGrid count={4} />);
    const grid = screen.getByRole('status', { name: /loading clinical records/i });
    expect(grid).toBeInTheDocument();
    const cards = within(grid).getAllByTestId('skeleton-card');
    expect(cards).toHaveLength(4);
  });
});

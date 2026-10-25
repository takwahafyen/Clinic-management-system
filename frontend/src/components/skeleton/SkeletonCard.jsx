import React from "react";
import "./skeleton.scss";

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-header">
        <div className="skeleton-avatar" />
        <div className="skeleton-title-group">
          <div className="skeleton-title" />
          <div className="skeleton-subtitle" />
        </div>
        <div className="skeleton-badge" />
      </div>
      <div className="skeleton-body">
        <div className="skeleton-line long" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line short" />
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-chip" />
        <div className="skeleton-btn" />
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 3 }) => {
  return (
    <div className="skeleton-grid" role="status" aria-label="Loading clinical records">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};

export default SkeletonCard;

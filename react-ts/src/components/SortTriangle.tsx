interface SortTriangleProps {
  fill: string;
  rotate: number;
}

function sortTriangle({ fill, rotate }: SortTriangleProps) {
  return (
    <div className="triangle-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        height="10"
        width="10"
      >
        <polygon
          points="50 15, 100 100, 0 100"
          fill={fill}
          transform={`rotate(${rotate})`}
        />
      </svg>
    </div>
  );
}

export default sortTriangle;

const DEFAULT_COLOR = "#D9D9D9";
export const COLOR_CIRCLE_SIZE = 160;

interface SelectedColorProps {
  color?: string;
}

export const SelectedColor = ({
  color = DEFAULT_COLOR,
}: SelectedColorProps) => (
  <svg
    width={COLOR_CIRCLE_SIZE}
    height={COLOR_CIRCLE_SIZE}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"
      fill={color}
    />
  </svg>
);

import "./ProgressBar.scss";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;

import "./Loader.scss";

interface LoaderProps {
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = "#8cafe9", className }) => {
  return (
    <span
      className={`loader ${className}`}
      style={{ borderColor: `${color}`, borderBottomColor: "transparent" }}
    />
  );
};

export default Loader;

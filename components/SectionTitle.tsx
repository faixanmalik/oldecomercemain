interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  return (
    <h2 className={`text-sm font-semibold text-gray-800`}>{title}</h2>
  );
};

export default SectionTitle;

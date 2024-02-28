const PillTag = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor: string;
}) => {
  return (
    <div
      className={`flex items-center rounded-xl w-min px-1.5 text-sm gap-2 ${
        bgColor ? bgColor : "bg-gray-200"
      }`}
    >
      {children}
    </div>
  );
};

export default PillTag;

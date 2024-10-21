interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white border-lime-400 shadow-sm shadow-lime-200">
      {title && (
        <div className="bg-lime-200 p-2">
          <strong>{title}</strong>
        </div>
      )}
      <div className="px-2 py-4 space-y-3">{children}</div>
    </div>
  );
};

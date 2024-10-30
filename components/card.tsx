interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="rounded-md overflow-hidden bg-white border border-neutral-100 shadow-neutral-100 shadow-sm p-4 space-y-3">
      {title && <strong>{title}</strong>}
      {children}
    </div>
  );
};

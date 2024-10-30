import clsx from "clsx";

interface ProgressProps {
  label: string;
  value: number;
}

export const Progress = ({ label, value }: ProgressProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-sm">{label}</span>
      <span className="block rounded-full bg-neutral-100">
        <span
          className={clsx("block h-2 rounded-full bg-lime-300")}
          style={{ width: `${value}%` }}
        />
      </span>
    </div>
  );
};

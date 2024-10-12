import clsx from "clsx";

interface ProgressProps {
  label: string;
  value: number;
}

export const Progress = ({ label, value }: ProgressProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-sm">{label}</span>
      <span className="block rounded-full bg-neutral-200">
        <span
          className={clsx("block h-2 rounded-full bg-neutral-700")}
          style={{ width: `${value}%` }}
        />
      </span>
    </div>
  );
};

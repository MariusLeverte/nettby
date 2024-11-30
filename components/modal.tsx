import { Button } from "./button";

interface ModalProps {
  title: string;
  subTitle?: string;

  onClose: () => void;
  children: React.ReactNode;

  onSubmit?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export const Modal = ({
  title,
  subTitle,
  onClose,
  onSubmit,
  submitLabel = "Lagre",
  isSubmitting,
  children,
}: ModalProps) => {
  return (
    <div
      tabIndex={-1}
      className="fixed w-full h-full inset-0 bg-black/50 flex items-center justify-center z-20"
    >
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}

            <div className="py-10">{children}</div>
            <div className="flex gap-4 justify-between">
              <Button variant="outline" onClick={onClose}>
                Lukk
              </Button>
              {onSubmit && (
                <Button onClick={onSubmit} loading={isSubmitting}>
                  {submitLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

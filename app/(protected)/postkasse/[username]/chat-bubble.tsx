import { ChatMessage } from "@/types/firestore";
import { firebaseTime } from "@/utils/time";
import { format } from "date-fns";

interface ChatBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export const ChatBubble = ({ message, isCurrentUser }: ChatBubbleProps) => {
  return (
    <div className="w-max grid">
      <div
        className={`px-3.5 py-2 ${
          isCurrentUser
            ? "bg-blue-500 text-white ml-auto rounded-tl-3xl rounded-tr-none"
            : "bg-gray-100 rounded-tr-3xl rounded-tl-none"
        } rounded-3xl justify-start items-center gap-3 inline-flex`}
      >
        <h5 className="text-sm font-normal leading-snug">{message.message}</h5>
      </div>
      <div
        className={`items-center inline-flex mb-2.5 ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        <h6 className="opacity-50 text-[10px] font-normal leading-4 mt-2">
          {format(firebaseTime(message.createdAt), "HH:mm:ss ' - ' dd.MM.yyyy")}
        </h6>
      </div>
    </div>
  );
};

import { formatRelative } from "date-fns";
import { nb } from "date-fns/locale";
import {
  getGuestbookMessages,
  getGuestbookMessagesCount,
} from "@/app/actions/firestore/guestbook";
import { serializer } from "@/components/SlateEditor/serialize";
import Link from "next/link";
import { GuestbookMessage } from "@/types/firestore";
import { getCachedUserById } from "@/app/actions/cache";

export const Post = async (props: GuestbookMessage) => {
  const sender = await getCachedUserById(props.senderId);

  return (
    <article className="p-6 rounded-lg border border-neutral-200">
      <div className="flex justify-between items-center mb-5">
        <Link href={`/${sender.slug}`} className="font-semibold">
          <span>{sender.userName}</span>
        </Link>
        <span className="text-sm opacity-55">
          {formatRelative(new Date(props.createdAt), new Date(), {
            locale: nb,
          })}
        </span>
      </div>

      <p
        className="prose"
        dangerouslySetInnerHTML={{
          __html: serializer(JSON.parse(props.message || "[]")).join(""),
        }}
      />
    </article>
  );
};

interface PostsProps {
  userId: string;
  page: number;
}

export const Posts = async ({ userId, page }: PostsProps) => {
  const count = await getGuestbookMessagesCount(userId);
  const messages = await getGuestbookMessages(userId);

  console.log("Total messages:", messages);

  return (
    <section className="space-y-6">
      {messages.map((message) => {
        return <Post key={message.id} {...message} />;
      })}
    </section>
  );
};

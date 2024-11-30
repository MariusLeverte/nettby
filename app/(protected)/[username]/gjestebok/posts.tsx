import { formatRelative } from "date-fns";
import { nb } from "date-fns/locale";
import { getGuestbookMessages } from "@/app/actions/firestore/guestbook";
import { serializer } from "@/components/SlateEditor/serialize";
import Link from "next/link";
import { GuestbookMessage } from "@/types/firestore";
import { getCachedCurrentUser, getCachedUserById } from "@/app/actions/cache";
import { UserProfileTeaser } from "@/components/user-link";
import { PostContextMenu } from "./post-context-menu";

export const Post = async (props: GuestbookMessage) => {
  const sender = await getCachedUserById(props.senderId);
  const currentUser = await getCachedCurrentUser();
  const isRecipient = props.recipientId === currentUser?.id;
  const isSender = props.senderId === currentUser?.id;

  return (
    <article className="p-6 rounded-lg border border-neutral-200">
      <div className="flex justify-between items-center mb-5">
        <Link href={`/${sender.slug}`}>
          <UserProfileTeaser
            userName={sender.userName}
            profileUrl={sender.profileUrl}
          />
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-55">
            {formatRelative(new Date(props.createdAt), new Date(), {
              locale: nb,
            })}
          </span>
          <PostContextMenu isSender={isSender} isRecipient={isRecipient} />
        </div>
      </div>

      <p
        className="prose max-w-none"
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

export const Posts = async ({ userId }: PostsProps) => {
  const messages = await getGuestbookMessages(userId);

  return (
    <section className="space-y-6">
      {messages.map((message) => {
        return <Post key={message.id} {...message} />;
      })}
    </section>
  );
};

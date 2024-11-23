export interface User {
  id: string;
  userName: string;
  slug: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  profileUrl?: string;
  bio?: string;
  lastActive?: Date;
}

export interface Friendship {
  id: string;
  requestedAt: Date;
  requestedBy: string;
  status: "pending" | "accepted";
  users: string[];
}

export interface GuestbookMessage {
  id: string;
  message: string;
  senderId: string;
  recipientId: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  conversationId: string;
  message: string;
  createdAt: Date;
}

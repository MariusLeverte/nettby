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

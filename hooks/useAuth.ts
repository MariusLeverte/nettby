import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async (user) => {
      setSession(user);
      setLoading(false);

      if (user) {
        fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        });
      }
    });
    return subscriber;
  }, []);

  return { user: session, loading };
};

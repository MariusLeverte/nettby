export function generateUniqueId(username: string): string {
  // Gjør brukernavnet til små bokstaver
  const lowerCaseUsername = username.toLowerCase();

  // Funksjon for å generere en tilfeldig streng
  function getRandomString(length: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  // Generer en tilfeldig streng på 5 tegn
  const randomString = getRandomString(5);

  // Returner kombinasjonen av brukernavn og tilfeldig streng
  return `${lowerCaseUsername}-${randomString}`;
}

export const getFriendshipId = (
  userId1: string | undefined,
  userId2: string
): string => {
  return [userId1, userId2].sort().join("_");
};

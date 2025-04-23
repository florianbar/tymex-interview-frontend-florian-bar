export function getRandomUserImage(): string {
  const users = [
    "assassin",
    "basketball-girl",
    "mafia-england",
    "neon-guy",
    "the-dj",
  ];
  const randomIndex = Math.floor(Math.random() * 5);
  return `/images/users/${users[randomIndex]}.png`;
}

export function getRandomImageColor(): string {
  const colors = ["purple", "green", "yellow", "red", "blue"];
  const randomIndex = Math.floor(Math.random() * 5);
  return colors[randomIndex];
}

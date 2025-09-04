export function formatTime(time?: any): any {
  if (!time || typeof time !== "string") {
    return "";
  }

  const parts = time.split(":");

  if (parts.length < 2) {
    return "";
  }

  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);

  if (isNaN(minutes) || isNaN(seconds)) {
    return "";
  }

  if (minutes === 0) {
    return `0:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

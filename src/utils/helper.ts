export function convertCamelCaseToWords(camelCaseString: string) {
  if (!camelCaseString) return "";
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatCurrentTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: string | Date): string {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export function getImage(imageUrl: string): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const url = `${process.env.API_BASE_URL}${imageUrl}`;
  return url;
}

export const getCurrentDate = () => new Date().toISOString().slice(0, 10);

export const getCurrentTime = () => new Date().toTimeString().slice(0, 8);

export const getCurrentLocalTime = (): string => {
  // Returns time in the format of HH:MM
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatNumber = (value?: number) =>
  typeof value === "number"
    ? value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0";

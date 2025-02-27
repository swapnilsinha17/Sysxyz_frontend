export function formatDate(dateString, format = "iso") {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return "Invalid Date"; // Handle invalid date input
  }

  switch (format) {
    case "12-hour": {
      // 12-hour format with AM/PM and date (MM/DD/YYYY) in UTC
      return `${date.toLocaleDateString("en-US", {
        timeZone: "UTC",
      })} ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "UTC",
      })}`;
    }

    case "24-hour": {
      // 24-hour format with date (MM/DD/YYYY) in UTC
      return `${date.toLocaleDateString("en-US", {
        timeZone: "UTC",
      })} ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
      })}`;
    }

    case "iso": {
      // ISO format with date and time (YYYY-MM-DDTHH:mm:ss.sssZ) in UTC
      return date.toISOString();
    }

    case "custom": {
      // Custom date format (DD/MM/YYYY) and time (12-hour with AM/PM) in UTC
      return `${String(date.getUTCDate()).padStart(2, "0")}/${String(
        date.getUTCMonth() + 1
      ).padStart(2, "0")}/${date.getUTCFullYear()} ${
        date.getUTCHours() % 12 || 12
      }:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(
        date.getUTCSeconds()
      ).padStart(2, "0")} ${date.getUTCHours() >= 12 ? "PM" : "AM"}`;
    }

    case "iso-no-seconds": {
      // Custom ISO format without seconds (YYYY-MM-DDTHH:mm) in UTC
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    case "date-only": {
      // Date only format (MM/DD/YYYY) in UTC
      return date.toLocaleDateString("en-US", { timeZone: "UTC" });
    }

    case "date-eu": {
      // Date in European format (DD/MM/YYYY) in UTC
      return `${String(date.getUTCDate()).padStart(2, "0")}/${String(
        date.getUTCMonth() + 1
      ).padStart(2, "0")}/${date.getUTCFullYear()}`;
    }

    case "date-iso": {
      // Date in ISO format (YYYY-MM-DD) in UTC
      return date.toISOString().split("T")[0];
    }

    default: {
      return "Invalid format type"; // Handle invalid format types
    }
  }
}

export function capitalizer(str) {
  if (!str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

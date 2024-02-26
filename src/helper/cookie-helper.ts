export function GetCookie(cookieName: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if the cookie starts with the desired name
    if (cookie.startsWith(cookieName + "=")) {
      // Return the cookie value (substring after the equals sign)
      return cookie.substring(cookieName.length + 1);
    }
  }
  // Return null if the cookie is not found
  return null;
}

export async function FetchUserIdCookie() {
  try {
    console.log("Fetching userId cookie...");
    const response = await fetch("http://localhost:8080/session/setuserid", {
      method: "GET", // Or 'POST', depending on your server's requirements
      credentials: "include", // This ensures that cookies are sent with the request
      // You may need to include additional headers if required by your server
    });

    // Check if the request was successful
    if (response.ok) {
      return GetCookie("userId");
    } else {
      // Handle errors if any
      console.error("Failed to obtain cookie:", response.statusText);
    }
  } catch (error) {
    console.error("Error obtaining cookie:", error);
  }

  return null;
}

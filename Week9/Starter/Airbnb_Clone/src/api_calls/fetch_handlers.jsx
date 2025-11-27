//This file will hold our fetch requests.
// We will make these more generic so we can use them again.
export async function genericGet(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`GET failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("GET error:", err);
    throw err;
  }
}

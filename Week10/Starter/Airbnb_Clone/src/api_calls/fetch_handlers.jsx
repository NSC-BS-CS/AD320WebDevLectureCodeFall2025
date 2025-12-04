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

export async function genericPost(url, body) {
  console.log(body);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`POST failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("POST error:", err);
    throw err;
  }
}

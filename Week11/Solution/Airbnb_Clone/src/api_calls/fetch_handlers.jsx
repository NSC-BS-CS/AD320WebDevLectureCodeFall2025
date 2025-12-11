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
export async function genericPatch(url, body) {
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`PATCH failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("PATCH error:", err);
    throw err;
  }
}

export async function genericDelete(url) {
  try {
    const res = await fetch(url, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`DELETE failed with status ${res.status}`);
    }

    // Some APIs return data, some don't
    return res.status !== 204 ? await res.json() : null;
  } catch (err) {
    console.error("DELETE error:", err);
    throw err;
  }
}

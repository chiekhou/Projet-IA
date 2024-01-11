const CHATGPT_API = "/api/chatgpt";

export async function recommandation(recipeName) {
    const response = await fetch(CHATGPT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeName),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error create recipe");
    }
  }
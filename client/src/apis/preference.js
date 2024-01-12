const PREFERENCE_API = "/api/preferences";

export async function createPreference(newPreference,authToken) {
    const response = await fetch(PREFERENCE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authToken}`
      },
      body: JSON.stringify(newPreference),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error create preference");
    }
  }

  export async function updatePreference(updatedPreference,authToken) {
    const { id_preference, ...restPreference } = updatedPreference;
    const response = await fetch(`${PREFERENCE_API}/${id_preference}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authToken}`
      },
      body: JSON.stringify(restPreference),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error update preference");
    }
  }

  export async function getAllPreferenceByUser() {
    const response = await fetch(
      `${PREFERENCE_API }`
    );
    if (response.ok) {
      const body = await response.json();
      console.log(body)
      return body;
    } else {
      throw new Error("Error fetch recipes like");
    }
  }
  

  export async function deletePreference(id_preference,authToken) {
    const response = await fetch(`${PREFERENCE_API}/${id_preference}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${authToken}`
      },
    });
    if (response.ok) {
      return id_preference;
    } else {
      throw new Error("Error delete preference");
    }
  }
const ENDPOINT =
  "https://diykd2rwv0.execute-api.us-east-1.amazonaws.com/typeahead";

export const searchSuggestionApiCall = async (name, options = {}) => {
  let data = [];
  let error = false;
  try {
    const response = await fetch(`${ENDPOINT}/${name}`, {
      signal: options?.signal,
    });
    data = await response.json();
  } catch (e) {
    error = e;
  }
  return { data, error };
};

export const selectedSuggestionApiCall = async (name) => {
  let error = false;
  let data = null;
  try {
    data = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  } catch (e) {
    error = e;
  }
  return { data, error };
};

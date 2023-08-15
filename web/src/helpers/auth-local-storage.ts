const LOCAL_STORAGE_KEY = "ivipcoin@access_token";

export function getAccessToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

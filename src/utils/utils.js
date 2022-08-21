const THEME_KEY = "theme";
const TOKEN_KEY = "token";
const USER_DATA_KEY = "user";
const CART_KEY = "cart";

export function getTheme() {
  const currentTheme = localStorage.getItem(THEME_KEY) || "light";
  const root = window.document.documentElement;
  root.classList.add(currentTheme);
  return currentTheme;
}

export function setTheme(value) {
  const root = window.document.documentElement;
  if (getTheme()) root.classList.remove(getTheme());
  root.classList.add(value);
  localStorage.setItem(THEME_KEY, value === "light" ? "light" : "dark");
}

export function getToken() {
  const localStorageToken = localStorage.getItem(TOKEN_KEY);
  const sessionStorageToken = sessionStorage.getItem(TOKEN_KEY);

  if (localStorageToken) return localStorageToken;
  if (sessionStorageToken) return sessionStorageToken;
  return null;
}

export function setUserLogin(props) {
  const { isRememberMe = false, userData, token } = props;

  if (isRememberMe) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getUserData() {
  const localStorageData = localStorage.getItem(USER_DATA_KEY);
  const sessionStorageData = sessionStorage.getItem(USER_DATA_KEY);

  try {
    if (localStorageData) return JSON.parse(localStorageData);
    if (sessionStorageData) return JSON.parse(sessionStorageData);
  } catch {
    return null;
  }
}

export function isUserLogin() {
  const localStorageToken = localStorage.getItem(TOKEN_KEY);
  const sessionStorageToken = sessionStorage.getItem(TOKEN_KEY);
  const userData = getUserData();

  if ((localStorageToken || sessionStorageToken) && userData) return true;
  return false;
}

export function restLoginData() {
  localStorage.clear();
  sessionStorage.clear();
}

export function getErrorMessage(error, validatorKeys) {
  const errorResponse = error.response.data;
  if (!errorResponse) return "Invalid error object";

  for (let index = 0; index < validatorKeys.length; index++) {
    const key = validatorKeys[index];

    if (errorResponse.hasOwnProperty(key)) {
      if (typeof errorResponse[validatorKeys] === "list") {
        return errorResponse[validatorKeys][0];
      }
      if (typeof errorResponse[validatorKeys] === "object")
        return errorResponse[validatorKeys];
    }
  }

  if (errorResponse.hasOwnProperty("message")) {
    return errorResponse.message;
  }

  if (errorResponse.hasOwnProperty("detail")) {
    return errorResponse.detail;
  }

  return "Something went wrong!";
}

export function setUserData(userData) {
  if (!userData) return;

  const localStorageUserData = localStorage.getItem(USER_DATA_KEY);
  const sessionStorageUserData = sessionStorage.getItem(USER_DATA_KEY);

  if (localStorageUserData) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return;
  }
  if (sessionStorageUserData) {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
}

export function getDate(strDate) {
  const date = new Date(strDate);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function setCart(productList) {
  localStorage.setItem(CART_KEY, JSON.stringify(productList));
}

export function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  if (!cart) return [];

  try {
    return JSON.parse(cart);
  } catch {
    setCart([]);
    return [];
  }
}

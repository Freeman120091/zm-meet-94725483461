const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
}

export const encodeURL = (baseUrl: string): string => {
    const [path, queryString] = baseUrl.split('?');
    if (!queryString) return encodeURI(baseUrl);
  
    const params = new URLSearchParams();
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      params.append(key, value);
    });
  
    return `${path}?${params.toString()}`;
  }
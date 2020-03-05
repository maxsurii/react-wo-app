const getBaseUrl = auth => {
  if (auth === null) {
    return "http://localhost:9080/maximo";
  } else {
    return auth.host;
  }
};

export const getUrl = (host, path, auth, queryParams) => {
  let baseurl = host;
  if (auth !== null) {
    baseurl = getBaseUrl(auth);
  }
  let url = baseurl + path;
  if (queryParams) {
    Object.keys(queryParams).forEach(
      e => (url = updateQueryStringParameter(url, e, queryParams[e]))
    );
  }
  url = updateQueryStringParameter(url, "lean", "1");

  return url;
};

const updateQueryStringParameter = (uri, key, value) => {
  let re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
  if (value === undefined) {
    if (uri.match(re)) {
      return uri.replace(re, "$1$2");
    } else {
      return uri;
    }
  } else {
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      let hash = "";
      if (uri.indexOf("#") !== -1) {
        hash = uri.replace(/.*#/, "#");
        uri = uri.replace(/#.*/, "");
      }
      let separator = uri.indexOf("?") !== -1 ? "&" : "?";
      return uri + separator + key + "=" + value + hash;
    }
  }
};

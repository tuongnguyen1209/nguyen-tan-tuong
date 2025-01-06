const getApis = (url: string) => {
  return fetch(url);
};

export default {
  get: getApis,
};

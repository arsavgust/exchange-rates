export default {
  // клонируем объект (используется для поддержания иммутабельности)
  clone: (obj) => JSON.parse(JSON.stringify(obj)),
};

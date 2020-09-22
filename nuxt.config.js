export default {
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: "https://3gzhl.sse.codesandbox.io"
  },
  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
    {
      path: "/api",
      handler: (req, res, next) => {
        const url = require("url");
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      }
    },
    { path: "/api", handler: "~/serverMiddleware/api-server.js" }
  ],
  plugins: ["~/plugins/api-context.js"]
};

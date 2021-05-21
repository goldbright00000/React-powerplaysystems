const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/hosted-pay/payment-request",
    createProxyMiddleware({
      target: "https://ipaytotal.solutions",
      changeOrigin: true,
    })
  );
};

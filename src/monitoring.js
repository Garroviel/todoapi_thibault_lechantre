const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Nombre total de requetes HTTP",
  labelNames: ["method", "route", "status"],
});

module.exports = {
  client,
  httpRequests,
};
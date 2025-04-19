import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  // Const method = req.method;
  // Const url = req.url;
  const { method, url } = req;

  await json(req, res);

  console.log(method, url);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  console.log(route);

  res.writeHead(404).end("Página não encontrada");
});

server.listen(3333);

// http://localhost:3333/

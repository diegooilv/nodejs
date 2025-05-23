//users/:id
export function buildRoutesPath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const paramsWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)"
  );

  console.log(Array.from(path.matchAll(routeParametersRegex)));
  const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}

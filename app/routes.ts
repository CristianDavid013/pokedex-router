// routes.ts
import type { RouteConfig } from "@react-router/dev/routes";
import {
  layout,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    route("pokemon/:id", "routes/PokemonCard.tsx"),
  ]),
] satisfies RouteConfig;

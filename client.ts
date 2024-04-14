import * as Http from "@effect/platform/HttpClient"
import { Resolver } from "@effect/rpc"
import { HttpResolver } from "@effect/rpc-http"
import { Effect } from "effect"
import type { Router } from "./router"
import { GetPropertiesProcedure } from "./router"

// Create the client
const client = HttpResolver.make<Router>(
  Http.client.fetchOk().pipe(
    Http.client.mapRequest(Http.request.prependUrl("http://localhost:3000/rpc"))
  )
).pipe(Resolver.toClient)

// Use the client
await client(new GetPropertiesProcedure()).pipe(
  Effect.tap((resp) => Effect.logInfo(resp)),
  Effect.runPromise
)

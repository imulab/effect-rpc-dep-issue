import * as Http from "@effect/platform/HttpServer"
import { HttpRouter } from "@effect/rpc-http"
import { BunHttpServer, BunRuntime } from "@effect/platform-bun"
import { Layer } from "effect"
import { Properties, router } from "./router"

const HttpLive = Http.router.empty.pipe(
  Http.router.post("/rpc", HttpRouter.toHttpApp(router)),
  Http.server.serve(Http.middleware.logger),
  Http.server.withLogAddress,
  Layer.provide(BunHttpServer.server.layer({ port: 3000 })),
  Layer.provide(
    Layer.succeed(Properties, { corpId: "foo" })  // <- here we inject a Properties impl.
  )
)

Layer.launch(HttpLive).pipe(BunRuntime.runMain)

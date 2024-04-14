import * as S from "@effect/schema/Schema"
import { Context, Effect } from "effect"
import * as Rpc from "@effect/rpc/Rpc"
import { Router } from "@effect/rpc"

const propsShape = S.struct({
  corpId: S.string.pipe(S.nonEmpty())
})

// Properties is the tag of our main "service".
export class Properties extends Context.Tag("example/Properties")<
  Properties,
  S.Schema.Type<typeof propsShape>
>() { }

// GetPropertiesResponse is the response schema for GetPropertiesProcedure.
export class GetPropertiesResponse extends S.Class<GetPropertiesResponse>("example/GetPropertiesResponse")({
  corpId: S.string,
}) { }

// GetPropertiesProcedure is our main "RPC" procedure.
export class GetPropertiesProcedure extends S.TaggedRequest<GetPropertiesProcedure>()(
  "example/GetPropertiesProcedure",
  S.never,
  GetPropertiesResponse,
  {}
) { }

// Here we implement GetPropertiesProcedure.
const GetPropertiesProcedureLive = Rpc.effect(
  GetPropertiesProcedure,
  (_) => Effect.gen(function*($) {
    const props = yield* $(Properties)  // require dependency here.

    return { corpId: props.corpId }
  })
)

export const router = Router.make(GetPropertiesProcedureLive)

export type Router = typeof router


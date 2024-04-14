# effect-rpc-dep-issue

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run server.ts
bun run client.ts
```

Problem description:

- Expected: the client can call server, and server responds with properties in response.
- Actual: The client fails with `(FiberFailure) Error: Service not found: example/Properties (defined at module code (/home/imulab/Workspace/effect-rpc-dep-issue/router.ts:9:66))` error.


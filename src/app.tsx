import { Title } from "@solidjs/meta"
import { Loading } from "solid-js"
import env from "virtual:env/client"

import "@/styles/global.css"

// Typed client env, validated and baked in at build time (see env.ts).
import { Router } from "./router"

export default function Root() {
  return (
    <Router>
      {/* Root Layout */}
      {(props) => {
        return (
          <>
            <Title>{env.VITE_APP_NAME}</Title>
            <Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
          </>
        )
      }}
    </Router>
  )
}

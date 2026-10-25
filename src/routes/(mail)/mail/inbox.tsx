import { Temporal } from "@js-temporal/polyfill"
import { XIcon } from "@lucide/solid"
import { RouteDefinition, useSearchParams } from "@solidjs/router"
import { For } from "@solidjs/web"
import { createMemo, onSettled } from "solid-js"
import * as v from "valibot"

import { Dialog, DialogClose } from "@/components/dialog"
import { getEmails } from "@/lib/users"

const vSearch = v.object({
  email_view: v.optional(v.union([v.literal("right"), v.literal("fullscreen")])),
  message_id: v.optional(v.string()),
})
type SearchParams = v.InferOutput<typeof vSearch>

export const route = {
  preload: () => void getEmails(),
  search: vSearch,
} satisfies RouteDefinition

export default function InboxPage() {
  const [search, setSearch] = useSearchParams<SearchParams>()
  const emails = createMemo(() => getEmails())

  const selectedEmail = createMemo(() =>
    emails().find((x) => x.messageId === search.message_id),
  )

  let dialogHandle: HTMLDialogElement

  const autoOpenDialog = (element: HTMLDialogElement) => {
    onSettled(() => {
      if (search.message_id && search.email_view === "right") element.showModal()
    })

    return (next: HTMLDialogElement) => (element = next)
  }

  return (
    <main class="size-full overflow-y-scroll bg-stone-50 p-3">
      <h1 class="text-stone-800">Inbox</h1>
      <ol aria-label="Email" class="space-y-1">
        <For each={emails()}>
          {({ messageId, date, from: { firstName, lastName }, subject, text }) => (
            <li
              class="relative flex items-start gap-x-2 rounded-xl px-2 py-1.5 leading-5 hover:bg-stone-200"
              onClick={() => {
                setSearch({ email_view: "right", message_id: messageId })
                dialogHandle.showModal()
              }}
            >
              <span class="size-9 content-center rounded-full bg-stone-400 text-center font-mono">{`${firstName[0]}${lastName[0]}`}</span>
              <div class="flex flex-1 flex-col">
                <span class="font-medium text-stone-800">{`${firstName} ${lastName}`}</span>
                <span class="mt-0.5 leading-5 text-stone-900">{subject}</span>
                <span class="mt-1 line-clamp-2 max-w-180 leading-5 text-stone-500">
                  {text}
                </span>
              </div>
              <span class="absolute top-2 right-2 text-stone-500">
                {parseEmailDate(date)}
              </span>
            </li>
          )}
        </For>
      </ol>

      <Dialog
        closedby="any"
        ref={[(el) => (dialogHandle = el), autoOpenDialog]}
        class="fixed inset-y-2 right-2 left-auto m-0 h-auto max-h-none w-140 translate-x-0 rounded-xl bg-stone-50 text-stone-900 transition-transform duration-200 ease-out starting:translate-x-full"
        onClose={() => setSearch({ email_view: undefined, message_id: undefined })}
      >
        <div class="relative size-full px-5 py-4">
          <For each={selectedEmail()?.text.split("\n")}>
            {(line) => (line.length > 0 ? <p class="leading-5">{line}</p> : <br />)}
          </For>

          <DialogClose class="absolute top-2 right-2 rounded-full p-0.5 text-stone-600 hover:cursor-pointer hover:bg-stone-200 hover:text-stone-900">
            <XIcon class="size-5" />
          </DialogClose>
        </div>
      </Dialog>
    </main>
  )
}

const parseEmailDate = (date: string) => {
  const parsedDate = Temporal.ZonedDateTime.from(date)
  const now = Temporal.Now.zonedDateTimeISO()

  return parsedDate.toPlainDate().equals(now.toPlainDate())
    ? new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(parsedDate.epochMilliseconds))
    : new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(new Date(parsedDate.epochMilliseconds))
}

import {
  ArchiveIcon,
  ChevronDownIcon,
  ChevronsRightIcon,
  ChevronUpIcon,
  ClockIcon,
  EllipsisIcon,
  ForwardIcon,
  ReplyAllIcon,
  ReplyIcon,
  TagIcon,
  TrashIcon,
} from "@lucide/solid"
import { RouteDefinition, useSearchParams } from "@solidjs/router"
import { For, Show } from "@solidjs/web"
import { action, createMemo, createOptimisticStore, onSettled, refresh } from "solid-js"
import * as v from "valibot"

import { Dialog, DialogClose } from "@/components/dialog"
import * as EmailService from "@/lib/users"
import { Name } from "@/server/db"

const vSearch = v.object({
  email_view: v.optional(v.union([v.literal("right"), v.literal("fullscreen")])),
  message_id: v.optional(v.string()),
})
type SearchParams = v.InferOutput<typeof vSearch>

export const route = {
  preload: () => void EmailService.getEmails(),
  search: vSearch,
} satisfies RouteDefinition

export default function InboxPage() {
  const [search, setSearch] = useSearchParams<SearchParams>()
  const [emails, setEmails] = createOptimisticStore(() => EmailService.getEmails(), [])

  const selectedEmail = createMemo(() =>
    emails.find((x) => x.messageId === search.message_id),
  )

  const markRead = action(function* (id: string) {
    setEmails((emails) => {
      const email = emails.find((x) => x.messageId === id)
      if (email) email.status = "read"
    })
    yield EmailService.updateEmail(id, { status: "read" })
    void refresh(emails)
  })

  let dialogHandle: HTMLDialogElement

  const autoOpenDialog = (element: HTMLDialogElement) => {
    onSettled(() => {
      if (search.message_id && search.email_view === "right") element.showModal()
    })

    return (next: HTMLDialogElement) => (element = next)
  }

  return (
    <div class="bg-stone-50 px-5 py-4">
      <h1 class="text-stone-800">Inbox</h1>
      <ol aria-label="Email" class="space-y-1">
        <For each={emails}>
          {(email) => (
            <li
              class="relative flex items-start gap-x-1.5 rounded-xl px-3 py-2.5 leading-5 hover:bg-stone-200"
              onClick={() => {
                setSearch({ email_view: "right", message_id: email.messageId })
                dialogHandle.showModal()
                void markRead(email.messageId)
              }}
            >
              <Show when={email.status === "unread"}>
                <span class="mt-1.5 size-2 rounded-full bg-blue-500" />
              </Show>

              <div class="flex flex-1 flex-col">
                <span
                  class={[
                    "text-stone-800",
                    {
                      "font-semibold": email.status === "unread",
                      "font-medium": email.status === "read",
                    },
                  ]}
                >{`${email.from.name.firstName} ${email.from.name.lastName}`}</span>
                <span
                  class={[
                    "mt-0.5 leading-5 text-stone-900",
                    {
                      "font-medium": email.status === "unread",
                    },
                  ]}
                >
                  {email.subject}
                </span>
                <span class="mt-1 line-clamp-2 max-w-180 leading-5 text-stone-500">
                  {email.text}
                </span>
              </div>
              <span class="absolute top-2 right-2 text-stone-500">
                {toDisplayDate(email.date)}
              </span>
            </li>
          )}
        </For>
      </ol>

      <Dialog
        closedby="any"
        ref={[(el) => (dialogHandle = el), autoOpenDialog]}
        class="my-2 mr-2 ml-auto h-auto w-140 translate-x-0 rounded-xl bg-stone-50 px-5 py-4 text-stone-900 transition-transform duration-200 ease-out starting:translate-x-full"
        onClose={() => setSearch({ email_view: undefined, message_id: undefined })}
      >
        <div class="inline-flex w-full items-center justify-between py-1">
          <div class="flex [&_button]:size-7 [&_svg]:size-5.5">
            <DialogClose class={emailViewStyles.button}>
              <ChevronsRightIcon />
            </DialogClose>

            <button class={emailViewStyles.button}>
              <ChevronUpIcon />
            </button>

            <button class={emailViewStyles.button}>
              <ChevronDownIcon />
            </button>
          </div>

          <div class="flex gap-x-0.5 [&_button]:size-7 [&_svg]:size-4.5">
            <button class={emailViewStyles.button}>
              <ClockIcon />
            </button>

            <button class={emailViewStyles.button}>
              <TagIcon />
            </button>

            <button class={emailViewStyles.button}>
              <ArchiveIcon />
            </button>

            <button class={emailViewStyles.button}>
              <TrashIcon />
            </button>

            <button class={emailViewStyles.button}>
              <EllipsisIcon />
            </button>
          </div>
        </div>

        <Show when={selectedEmail()}>
          <div class="p-1">
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="font-medium">
                  {toDisplayName(selectedEmail()!.from.name)}
                </span>
                <span class="text-stone-500">
                  To{" "}
                  {selectedEmail()!
                    .to.map((p) => p.email)
                    .join(", ")}
                </span>
              </div>

              <div class="inline-flex h-fit items-center gap-x-3 text-stone-500">
                <div class="inline-flex gap-x-0.5 [&_button]:size-7 [&_svg]:size-5.5">
                  <button class={emailViewStyles.button}>
                    <ReplyIcon />
                  </button>
                  <Show when={selectedEmail()!.to.length > 1}>
                    <button class={emailViewStyles.button}>
                      <ReplyAllIcon />
                    </button>
                  </Show>
                  <button class={emailViewStyles.button}>
                    <ForwardIcon />
                  </button>
                </div>
                <span class="text-stone-500">{toDisplayDate(selectedEmail()!.date)}</span>
              </div>
            </div>

            <div class="mt-4">
              <For each={selectedEmail()?.text.split("\n")}>
                {(line) => (line.length > 0 ? <p class="leading-5">{line}</p> : <br />)}
              </For>
            </div>
          </div>
        </Show>
      </Dialog>
    </div>
  )
}

const emailViewStyles = {
  button:
    "rounded-lg flex items-center justify-center p-0.5 text-stone-500 hover:cursor-pointer hover:bg-stone-200 hover:text-stone-800 focus-visible:outline-blue-400 focus-visible:outline-2 focus-visible:outline-solid",
} as const

const toDisplayName = ({ firstName, lastName }: Name) => `${firstName} ${lastName}`

const toDisplayDate = (date: string) => {
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

import type { ParentProps } from "solid-js"

import {
  InboxIcon,
  LucideIcon,
  MegaphoneIcon,
  MessageSquareTextIcon,
  PencilLineIcon,
  SendIcon,
  ShoppingCartIcon,
  SidebarCloseIcon,
  SquareExclamationPointIcon,
  TrashIcon,
} from "@lucide/solid"
import { For } from "solid-js"

type SidebarGroup = {
  label: string
  items: {
    Icon: LucideIcon
    name: string
  }[]
}

const sidebar = {
  groups: [
    {
      label: "Views",
      items: [
        {
          Icon: InboxIcon,
          name: "Inbox",
        },
        {
          Icon: ShoppingCartIcon,
          name: "Transactions",
        },
        {
          Icon: MessageSquareTextIcon,
          name: "Updates",
        },
        {
          Icon: MegaphoneIcon,
          name: "Promotions",
        },
      ],
    },
    {
      label: "Mail",
      items: [
        {
          Icon: SendIcon,
          name: "Sent",
        },
        {
          Icon: PencilLineIcon,
          name: "Drafts",
        },
        {
          Icon: SquareExclamationPointIcon,
          name: "Spam",
        },
        {
          Icon: TrashIcon,
          name: "Trash",
        },
      ],
    },
  ],
} satisfies { groups: SidebarGroup[] }

export default function MailLayout(props: ParentProps) {
  return (
    <div class="flex size-full">
      <aside class="min-w-64 border-r border-stone-200 bg-stone-100 px-3 py-4 select-none">
        <div class="flex gap-x-1">
          <div class="flex flex-1 items-center gap-x-1.5 rounded-lg px-1.5 py-1 hover:bg-stone-200">
            <div class="size-7.5 content-center rounded-full bg-red-500 text-center font-mono">
              A
            </div>

            <div class="flex flex-1 flex-col">
              <span class="text-base/5 font-medium text-stone-800">Adrian Tilvar</span>
              <span class="text-sm/4 text-stone-500">adrian@email.com</span>
            </div>
          </div>

          <div class="flex text-stone-800 [&_button]:size-6 [&_svg]:size-4.5">
            <button class="ml-auto flex items-center justify-center rounded-lg text-stone-800 hover:bg-stone-200">
              <SidebarCloseIcon />
            </button>
          </div>
        </div>

        <div class="mt-4 flex flex-col gap-y-4">
          <For each={sidebar.groups}>
            {(group) => (
              <div>
                <p class="ml-2 text-stone-500/80">{group.label}</p>
                <ul class="flex flex-col text-stone-800 [&_svg]:size-4.5">
                  <For each={group.items}>
                    {({ Icon, name }) => (
                      <li class="inline-flex items-center gap-x-1 rounded-lg px-1.5 py-1 hover:bg-stone-200 hover:text-stone-950">
                        <Icon />
                        <span class="text-base/5">{name}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </aside>

      <main class="flex-1 overflow-y-scroll">{props.children}</main>
    </div>
  )
}

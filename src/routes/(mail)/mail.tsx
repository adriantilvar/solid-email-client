import type { RouteDefinition } from "@solidjs/router"
import type { ParentProps } from "solid-js"

import {
  InboxIcon,
  LucideIcon,
  MegaphoneIcon,
  MessageSquareTextIcon,
  PencilLineIcon,
  SendIcon,
  ShoppingCartIcon,
  SquareExclamationPointIcon,
  TrashIcon,
} from "@lucide/solid"
import { For } from "solid-js"

export default function MailLayout(props: ParentProps) {
  return (
    <div class="flex size-full">
      <aside class="min-w-60 border-r border-stone-200 bg-stone-100 px-3 select-none">
        <For each={sidebar.groups}>
          {(group) => (
            <div>
              <p class="text-stone-500/80">{group.label}</p>
              <ul class="flex flex-col text-stone-800">
                <For each={group.items}>
                  {({ Icon, name }) => (
                    <li class="inline-flex items-center gap-x-1 rounded-lg px-1.5 py-1 hover:bg-stone-200 hover:text-stone-950">
                      <Icon class="size-4" />
                      <span class="text-base/5">{name}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </aside>

      {props.children}
    </div>
  )
}

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

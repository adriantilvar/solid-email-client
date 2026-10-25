import { Portal } from "@solidjs/web"
import { JSX } from "@solidjs/web/jsx-runtime"
import { createContext, createUniqueId, ParentProps, useContext } from "solid-js"

// native dialog
type DialogContextApi = { dialogId: string }

const DialogContext = createContext<DialogContextApi>()

const DialogProvider = (props: ParentProps<{ value: DialogContextApi }>) => (
  <DialogContext value={props.value}>{props.children}</DialogContext>
)

export const Dialog = (props: JSX.DialogHtmlAttributes<HTMLDialogElement>) => {
  const dialogId = createUniqueId()

  return (
    <DialogProvider value={{ dialogId }}>
      <Portal>
        <dialog id={dialogId} {...props} />
      </Portal>
    </DialogProvider>
  )
}

export const DialogTrigger = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { dialogId } = useContext(DialogContext)

  return <button command="show-modal" commandfor={dialogId} {...props} />
}

export const DialogClose = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { dialogId } = useContext(DialogContext)

  return <button command="close" commandfor={dialogId} {...props} />
}

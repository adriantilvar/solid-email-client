import { Portal } from "@solidjs/web"
import { JSX } from "@solidjs/web/jsx-runtime"
import { createContext, createUniqueId, useContext } from "solid-js"

type DialogContextApi = { dialogId: string }

const DialogContext = createContext<DialogContextApi>()

export const Dialog = (props: JSX.DialogHtmlAttributes<HTMLDialogElement>) => {
  const dialogId = createUniqueId()

  return (
    <DialogContext value={{ dialogId }}>
      <Portal>
        <dialog {...props} id={dialogId} class={["fixed max-h-none", props.class]} />
      </Portal>
    </DialogContext>
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

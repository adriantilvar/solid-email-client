// The data source, as a server-only module: importing it from code that
// could reach the client bundle fails the build (the `server-only` marker
// comes typed via @solidjs/vite-plugin/boundary-modules). Swap the Map for a
// real database client — this file is the only place that knows.
import "server-only"

// Mails
export type Contact = {
  firstName: string
  lastName: string
  email: string
}

export type Email = {
  messageId: string
  date: string
  from: Contact
  to: Contact[]
  cc: Contact[]
  bcc: Contact[]
  subject: string
  text: string
}

const emails = [
  {
    messageId: "01a17354-62aa-761a-9479-3bed703d8b17",
    date: "2026-10-25T09:30:00+01:00[Europe/Copenhagen]",
    from: {
      firstName: "Alex",
      lastName: "Morgan",
      email: "alex.morgan@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [],
    bcc: [],
    subject: "Meeting follow-up",
    text: "Hi,\n\nThanks for the productive meeting today. I'll review the notes and share the updated proposal by Friday.\n\nBest regards,\nAlex",
  },
  {
    messageId: "01a17354-a586-70eb-849c-d7f522f05037",
    from: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [
      {
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
      },
    ],
    bcc: [],
    subject: "Project status update",
    date: "2026-10-24T16:45:00+02:00[Europe/Copenhagen]",
    text: "Hello,\n\nThe project is progressing well. We've completed the initial design and are now working on implementation. We expect to have a demo ready next week.\n\nBest,\nSarah",
  },
  {
    messageId: "01a17354-d476-751d-b402-9b08e0568cd9",
    from: {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [],
    bcc: [],
    subject: "Question about the API",
    date: "2026-10-24T14:20:00+02:00[Europe/Copenhagen]",
    text: "Hi,\n\nCould you clarify how the authentication flow is supposed to work with the new API? I want to make sure our implementation follows the intended approach.\n\nThanks,\nMichael",
  },
  {
    messageId: "01a17355-5637-725a-ba95-1b3e1d384695",
    from: {
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@example.com",
    },
    to: [
      { firstName: "Me", lastName: "", email: "me@email.com" },
      {
        firstName: "Alex",
        lastName: "Morgan",
        email: "alex.morgan@example.com",
      },
    ],
    cc: [],
    bcc: [],
    subject: "Lunch next week",
    date: "2026-10-23T11:15:00+02:00[Europe/Copenhagen]",
    text: "Hey,\n\nWould you be available for lunch sometime next week? It would be nice to catch up and discuss what everyone has been working on lately.\n\nLet me know what works for you!\n\nEmma",
  },
  {
    messageId: "01a17355-5637-725a-ba95-1cd4d6bca2e7",
    from: {
      firstName: "Daniel",
      lastName: "Taylor",
      email: "daniel.taylor@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [],
    bcc: [
      {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@example.com",
      },
    ],
    subject: "Updated invoice",
    date: "2026-10-22T15:00:00+02:00[Europe/Copenhagen]",
    text: "Hello,\n\nPlease find the updated invoice details below. The previous version contained an incorrect billing address, which has now been corrected.\n\nThe payment terms remain unchanged. Please let me know if you have any questions.\n\nRegards,\nDaniel",
  },
  {
    messageId: "01a17355-5637-725a-ba95-21fdf908ba5c",
    from: {
      firstName: "Olivia",
      lastName: "Anderson",
      email: "olivia.anderson@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [
      {
        firstName: "James",
        lastName: "Thomas",
        email: "james.thomas@example.com",
      },
    ],
    bcc: [],
    subject: "Feedback on the proposal",
    date: "2026-10-21T13:40:00+02:00[Europe/Copenhagen]",
    text: "Hi,\n\nI've reviewed the latest proposal and think it's in good shape overall. I'd suggest adding a short section explaining the expected maintenance costs and clarifying the project timeline.\n\nOther than that, I think we're ready to move forward.\n\nBest,\nOlivia",
  },
  {
    messageId: "01a17355-5637-725a-ba95-27c3e6546909",
    from: {
      firstName: "James",
      lastName: "Thomas",
      email: "james.thomas@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [],
    bcc: [],
    subject: "Reminder: Team meeting tomorrow",
    date: "2026-10-20T09:00:00+02:00[Europe/Copenhagen]",
    text: "Hi everyone,\n\nJust a quick reminder that our team meeting is scheduled for tomorrow at 10:00. We'll review the current sprint, discuss outstanding issues, and agree on priorities for next week.\n\nPlease bring any updates you'd like to share.\n\nThanks,\nJames",
  },
  {
    messageId: "01a17355-5637-725a-ba95-29f27beca7d1",
    from: {
      firstName: "Sophia",
      lastName: "Jackson",
      email: "sophia.jackson@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [],
    bcc: [],
    subject: "Documentation is ready",
    date: "2026-10-19T16:10:00+02:00[Europe/Copenhagen]",
    text: "Hello,\n\nThe documentation for the new feature is now complete and ready for review. I've included setup instructions, configuration examples, and a troubleshooting section.\n\nYou can send me any corrections or suggestions, and I'll incorporate them into the next revision.\n\nBest regards,\nSophia",
  },
  {
    messageId: "01a17355-5637-725a-ba95-2cde4adb2365",
    from: {
      firstName: "William",
      lastName: "White",
      email: "william.white@example.com",
    },
    to: [
      { firstName: "Me", lastName: "", email: "me@email.com" },
      {
        firstName: "Emma",
        lastName: "Wilson",
        email: "emma.wilson@example.com",
      },
    ],
    cc: [
      {
        firstName: "Alex",
        lastName: "Morgan",
        email: "alex.morgan@example.com",
      },
    ],
    bcc: [],
    subject: "Weekend plans",
    date: "2026-10-18T10:30:00+02:00[Europe/Copenhagen]",
    text: "Hey,\n\nA few of us are planning to go hiking this Saturday if the weather cooperates. We're thinking of starting around 9 AM and stopping somewhere for lunch along the way.\n\nLet me know if you'd like to join!\n\nWilliam",
  },
  {
    messageId: "01a17355-5637-725a-ba95-3366c47a1170",
    from: {
      firstName: "Isabella",
      lastName: "Harris",
      email: "isabella.harris@example.com",
    },
    to: [{ firstName: "Me", lastName: "", email: "me@email.com" }],
    cc: [],
    bcc: [],
    subject: "Account confirmation",
    date: "2026-10-17T08:15:00+02:00[Europe/Copenhagen]",
    text: "Hello,\n\nThis is a confirmation that your account setup has been completed successfully. You can now access the dashboard and begin configuring your preferences.\n\nIf you encounter any problems signing in, please reply to this email for assistance.\n\nKind regards,\nIsabella",
  },
] satisfies Email[]

export const listEmails = () => emails

// User

export interface User {
  name: string
  title: string
}

const users = new Map<string, User>([
  ["1", { name: "Ada Lovelace", title: "Wrote the first program" }],
  ["2", { name: "Grace Hopper", title: "Invented the compiler" }],
  ["3", { name: "Margaret Hamilton", title: "Took Apollo to the moon" }],
])

export function listUsers() {
  return Array.from(users, ([id, user]) => ({ id, ...user }))
}

export function findUser(id: string) {
  return users.get(id)
}

export function updateUser(id: string, data: Partial<User>) {
  const user = users.get(id)
  if (user) users.set(id, { ...user, ...data })
}

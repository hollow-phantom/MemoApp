import { Timestamp } from 'firebase/firestore'

interface Memo {
    id: string
    bodyText: string
    updatetedAt: Timestamp
}

export type { Memo }
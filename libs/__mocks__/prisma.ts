import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

const prisma = mockDeep<PrismaClient>()

// Lets Vitest know that between each individual test the mock should be reset to its original state.
beforeEach(() => {
  mockReset(prisma)
})

// 3
export default prisma
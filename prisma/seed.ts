import { PrismaService } from './prisma.service'

import { encryptData } from '@common/utils/encrypt-data'

import { addMonths } from 'date-fns'

const prisma = new PrismaService()

async function main() {
  const hashedPassword = await encryptData('123123123')

  await prisma.role.createMany({
    data: [{ type: 'USER' }, { type: 'ADMIN' }, { type: 'SUPER_ADMIN' }]
  })

  const SUPER_ADMIN_ROLE = await prisma.role.findUniqueOrThrow({
    where: {
      type: 'SUPER_ADMIN'
    }
  })

  const plan = await prisma.plan.create({
    data: {
      amount: 0,
      duration: 0,
      isFree: true,
      isTrial: true,
      name: 'Trial'
    }
  })

  await prisma.company.create({
    data: {
      name: 'Grupo Nobre',
      cnpj: '26487200000104',
      cpf: '01632218046',
      isActive: true,
      users: {
        create: {
          email: 'email@trial.com',
          name: 'user-super-admin',
          password: hashedPassword,
          roleId: SUPER_ADMIN_ROLE.id
        }
      },
      activeCompanyPlan: {
        create: {
          endDate: addMonths(new Date(), 1),
          isActive: true,
          remainingDaysWithActivePlan: 30,
          startDate: new Date(),
          plan: {
            connect: {
              id: plan.id
            }
          }
        }
      }
    }
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

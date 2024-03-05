import { PrismaService } from './prisma.service'

import { roundsOfHashing } from 'src/modules/user/user.service'

import * as bcrypt from 'bcrypt'
import { addMonths } from 'date-fns'

const prisma = new PrismaService()

async function main() {
  const hashedPassword = await bcrypt.hash('123123123', roundsOfHashing)

  await prisma.role.createMany({
    data: [{ type: 'USER' }, { type: 'ADMIN' }, { type: 'SUPER_ADMIN' }]
  })

  const SUPER_ADMIN_CREATED_ROLE = await prisma.role.findFirst({
    where: {
      type: 'SUPER_ADMIN'
    }
  })

  const plan = await prisma.plan.create({
    data: {
      amount: 0,
      duration: 30,
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
          roleId: SUPER_ADMIN_CREATED_ROLE.id
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

  await prisma.userRole.create({
    data: {
      role: {
        connect: {
          id: SUPER_ADMIN_CREATED_ROLE.id
        }
      },
      user: {
        connect: {
          email: 'email@trial.com'
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

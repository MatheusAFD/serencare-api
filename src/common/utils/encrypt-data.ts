import * as bcrypt from 'bcrypt'

const roundsOfHashing = 10

export async function encryptData(data: string) {
  const hashedData = await bcrypt.hash(data, roundsOfHashing)

  return hashedData
}

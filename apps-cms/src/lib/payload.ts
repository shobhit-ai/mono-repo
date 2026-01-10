import payload from 'payload'
import config from '@payload-config'

let isInit = false

export async function getPayloadClient() {
  if (!isInit) {
    await payload.init({
      config,
    })
    isInit = true
  }

  return payload
}

'use server'

import { envCheck } from '@/lib/server-utils' 

const monoKey = process.env.MONO_API_TOKEN_TEST!
const monoBasicUrl = process.env.MONO_API_BASIC_URL!

export async function checkMonoKey() {
  await envCheck()
  console.log('Fetch started')

  try {
    const res = await fetch(monoBasicUrl + 'personal/client-info', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': monoKey
      },
      method: 'GET'
    })

    const data = await res.json()
    console.log({data: data?.accounts})
  } catch(err: unknown) {
    console.error('User creation error:', err instanceof Error ? err.message : err)
    return
  }
}

export async function checkMonoMerchantInfo() {
  await envCheck()
  console.log('Fetch started')

  try {
    const res = await fetch(monoBasicUrl + 'api/merchant/details', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': monoKey
      },
      method: 'GET'
    })

    const data = await res.json()
    console.log({data})
  } catch(err: unknown) {
    console.error('User creation error:', err instanceof Error ? err.message : err)
    return
  }
}

export async function createNewInvoice() {
  await envCheck()
  console.log('Fetch started')

  try {
    const res = await fetch(monoBasicUrl + 'api/merchant/invoice/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'X-Token': monoKey
      },
      body: JSON.stringify({
        amount: 2000,
        redirectUrl: `https://mono-api-test.vercel.app/success-page?userId=sdqwdsaffdad&date=${Date.now()}`,
        webhookUrl: `https://mono-api-test.vercel.app/api/mono-webhook`
      })
    })

    const response = await res.json()
    console.log({ response })
  } catch(err: unknown) {
    console.error('User creation error:', err instanceof Error ? err.message : err)
    return
  }
}
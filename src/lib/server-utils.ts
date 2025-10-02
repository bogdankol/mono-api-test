'use server'
export async function envCheck() {
  const monoKeyAvailable = !!process.env.MONO_API_TOKEN_TEST
  const monoBasicUrlAvailable = !!process.env.MONO_API_BASIC_URL

  if(!monoKeyAvailable || !monoBasicUrlAvailable) throw Error('One of variables is missing')

  return 
}
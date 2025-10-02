import Content from './content'

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const paramsObj = await params
  const searchParamsObj = await searchParams
  console.log({paramsObj, searchParamsObj})
  return (
    <Content />
  )
}

export default Page
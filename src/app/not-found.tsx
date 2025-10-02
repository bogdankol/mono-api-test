import { redirect } from 'next/navigation'

function Page() {
  redirect('/')
  return (
    <div>not-found</div>
  )
}

export default Page
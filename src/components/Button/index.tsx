import { Button } from '@/components/shadcn/button'
import { TInvoiceResponse } from '@/lib/types'

type TProps = {
  onClick: () => Promise<void>
  text: string
  className?: string
}

export default function ButtonCustom({
  onClick,
  text,
  className
}: TProps) {
  return <Button onClick={onClick} className={className}>{text}</Button>
}
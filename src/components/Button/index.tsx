import { Button } from '@/components/shadcn/button'

type TProps = {
  props: {
    onClick: () => Promise<void> 
  }
  text: string
  className?: string
}

export default function ButtonCustom({
  props,
  text,
  className
}: TProps) {
  return <Button {...props} className={className}>{text}</Button>
}
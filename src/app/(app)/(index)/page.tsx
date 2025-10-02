'use client'
import ButtonCustom from '@/components/Button'
import {
	checkMonoKey,
	checkMonoMerchantInfo,
	createNewInvoice,
} from '@/actions/server-actions'
import { useState } from 'react'
import { TInvoiceResponse } from '@/lib/types'

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<TInvoiceResponse>()

  async function handleCreateNewInvoiceClick() {
    const data = await createNewInvoice()
    if(data?.invoiceId) {
      setInvoiceData(data)
    }
  }
	return (
    <>
      <div className='flex w-full h-full p-5 border-8 space-x-5'>
        <ButtonCustom
          onClick={checkMonoKey}
          text='check key'
          className=''
        />

        <ButtonCustom
          onClick={checkMonoMerchantInfo}
          text='Check Merchant Info'
        />

        <ButtonCustom
          onClick={handleCreateNewInvoiceClick}
          text='Create new invoice'
        />
      </div>

      {invoiceData && <div className='flex space-x-5 border-4 border-b-blue-950'>
        <p className='text-[18px] text-emerald-900'>{invoiceData.invoiceId}</p>

        <a className='text-[18px] text-emerald-900' href={invoiceData.pageUrl} target='_blank'>Invoice Link</a>
      </div>}
    
    </>
	)
}

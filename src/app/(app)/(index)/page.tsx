'use client'
import ButtonCustom from '@/components/Button'
import {
	checkMonoKey,
	checkMonoMerchantInfo,
	createNewInvoice,
  getStatusOfInvoiceById,
} from '@/actions/server-actions'
import { useRef, useState } from 'react'
import { TCheckInvoiceStatus, TPaymentGeneratedLink } from '@/lib/types'

export default function Home() {
	const [invoiceData, setInvoiceData] = useState<TPaymentGeneratedLink>()
  const [invoiceStatus, setInvoiceStatus] = useState<TCheckInvoiceStatus>()
  const invoiceInputRef = useRef(null)

	async function handleCreateNewInvoiceClick() {
		const data = await createNewInvoice()
		if (data?.pageUrl) {
			setInvoiceData(data)
		}
	}

  async function getInvoiceStatus() {
    if(!invoiceData?.pageUrl) return

    try {
      const res = getStatusOfInvoiceById(enteredInvoice)

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

      <div className='flex space-x-5 border-4 border-b-blue-950 mt-5 p-5 space-y-5'>
        <h3 >This is Invoice's data that is obtained by pressing *Create new invoice button*. While not pressed - its empty.</h3>
        {invoiceData && (
          <div>
            <p className='text-[18px] text-emerald-900 border-4 border-black'>
              <span className='font-bold text-black'>Invoice Id:</span>{' '}
              {invoiceData.invoiceId}
            </p>

            <a
              className='text-[18px] text-emerald-900 border-4 border-black'
              href={invoiceData.pageUrl}
              target='_blank'
            >
              Invoice Link
            </a>
          </div>
        )}
      </div>

      <div>
        <div>
          <h3>This container will display data obtained by pressing *Check invoice's status* button. While not it is empty.</h3>
          <
        </div>

      </div>

		</>
	)
}

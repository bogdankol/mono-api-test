'use client'
import ButtonCustom from '@/components/Button'
import {
	checkMonoKey,
	checkMonoMerchantInfo,
	createNewInvoice,
} from '@/actions/server-actions'

export default function Home() {
	return (
		<div className='flex w-full h-full p-5 border-8 space-x-5'>
			<ButtonCustom
				props={{
					onClick: checkMonoKey,
				}}
				text='check key'
				className=''
			/>

			<ButtonCustom
				props={{
					onClick: checkMonoMerchantInfo,
				}}
				text='Check Merchant Info'
			/>

      <ButtonCustom
				props={{
					onClick: createNewInvoice,
				}}
				text='Create new invoice'
			/>
		</div>
	)
}

'use client'
import ButtonCustom from '@/components/Button'
import {
	checkMonoKey,
	checkMonoMerchantInfo,
	createNewInvoice,
} from '@/actions/server-actions'
import { useState, useTransition } from 'react'
import { TCheckInvoiceStatus, TPaymentGeneratedLink } from '@/lib/types'
import InputCustom from '@/components/Input'
import { getStatusOfInvoiceById } from '@/actions/server-actions'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/shadcn/form'
import { zodSchema, TZodSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Home() {
	const [invoiceData, setInvoiceData] = useState<TPaymentGeneratedLink>()
	const [invoiceStatus, setInvoiceStatus] = useState<TCheckInvoiceStatus>()
	const [isPending, startTransition] = useTransition()

	const formHook = useForm({
		resolver: zodResolver(zodSchema),
		defaultValues: {
			invoiceId: '',
		},
	})

	const { getValues, trigger } = formHook

	async function handleCreateNewInvoiceClick() {
		const data = await createNewInvoice()
		if (data?.pageUrl) {
			setInvoiceData(data)
		}
	}

	function transformIntoArrayOfCortages<
		T extends Record<string, string | number | Date>,
	>(obj: any) {
		const arr = Object.entries(obj)
		console.log({ arr })
	}

	async function onSubmitHandler() {
		startTransition(async () => {
			const resultOfValidation = await trigger()
			if (!resultOfValidation) return
			const { invoiceId } = getValues()

      const res = await getStatusOfInvoiceById(invoiceId)
      console.log({res})
		})
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
				<h3>
					This is Invoice's data that is obtained by pressing *Create new
					invoice button*. While not pressed - its empty.
				</h3>
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

			<div className='flex space-x-5'>
				<div>
					<h3>
						This container will display data obtained by pressing *Check
						invoice's status* button. While not it is empty.
					</h3>
					<Form {...formHook}>
						<form onSubmit={formHook.handleSubmit(onSubmitHandler)}>
							<FormField
								{...{
									render: ({ field }) => (
										<FormItem>
											<FormLabel>Invoice Id</FormLabel>
											<FormControl>
												<InputCustom
													placeholder='Enter invoice Id...'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									),
									name: 'invoiceId',
								}}
							/>

							<ButtonCustom
								text='Check invoice*s status'
								type='submit'
                disabled={isPending}
							/>
						</form>
					</Form>
				</div>
				<div>
					{invoiceStatus && <>{transformIntoArrayOfCortages(invoiceStatus)}</>}
				</div>
			</div>
		</>
	)
}

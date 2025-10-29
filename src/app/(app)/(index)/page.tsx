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
import { zodSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import WorkerExample from '@/components/WorkerExample'

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

	async function onSubmitHandler() {
		startTransition(async () => {
			const resultOfValidation = await trigger()
			if (!resultOfValidation) return
			const { invoiceId } = getValues()

			const res = await getStatusOfInvoiceById(invoiceId)
			if (!res) throw Error('An error occurred')

			setInvoiceStatus(res)
			transformIntoArrayOfCortages(res)
		})
	}

	function transformIntoArrayOfCortages<T extends Record<string, any>>(obj: T) {
		const arr = Object.entries(obj)

		const arrWithInnerCortages = arr.map(cortage => {
			if (typeof cortage[1] !== 'object') return cortage
			return [cortage[0], Object.entries(cortage[1])]
		})

		return arrWithInnerCortages
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

			<button
				className='p-5 border-2 border-amber-500 hover:cursor-pointer bg-amber-700'
				onClick={() => {
					let result = 0
					for (let i = 0; i < 10000; i++) {
						result += i
						console.log('AAAAAAAAAAAAAAAAA')
					}
				}}
			>
				testButton
			</button>
			<button
				className='p-5 border-2 border-amber-500 hover:cursor-pointer bg-amber-700'
				onClick={() => {
					let result = 0
					for (let i = 0; i < 10000; i++) {
						result += i
						console.log('BBBBBBBBBBBBBBB')
					}
				}}
			>
				testButton2
			</button>

			<button
				className='p-5 border-2 border-amber-500 hover:cursor-pointer bg-amber-700'
				onClick={async () => {
					const res = await fetch('http://localhost:3000/api/fetch-hold', {
            method: 'GET'
          })
          const data = await res.json()
          console.log({data})
				}}
			>
				test Delayed Response
			</button>
			<WorkerExample />

			<div className='flex space-x-5 border-4 border-b-blue-950 mt-5 p-5 space-y-5'>
				<h3>
					This is Invoice&apos;s data that is obtained by pressing *Create new
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

			<div className='flex space-x-5 p-5'>
				<div className='w-1/2 space-y-4'>
					<h3>
						This container will display data obtained by pressing *Check
						invoice&apos;s status* button. While not it is empty.
					</h3>
					<Form {...formHook}>
						<form
							onSubmit={formHook.handleSubmit(onSubmitHandler)}
							className='space-y-4'
						>
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
				<div className='w-1/2'>
					{invoiceStatus && (
						<ul className='border-4 border-blue-800 p-4 w-full'>
							{transformIntoArrayOfCortages(invoiceStatus).map((cortage, i) => (
								<li key={i}>
									{cortage[0]}:{' '}
									{typeof cortage[1] !== 'object' ? (
										cortage[1]
									) : (
										<ul className='ml-4'>
											{cortage[1].map(
												([k, v]: [string, string | number | Date]) => (
													<li key={k}>
														{k}: {v instanceof Date ? v.toLocaleString() : v}
													</li>
												),
											)}
										</ul>
									)}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	)
}

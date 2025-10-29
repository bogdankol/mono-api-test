'use client'

import { useState, useEffect, useRef } from 'react'

export default function LongPollingDemo() {
	const [notifications, setNotifications] = useState<string[]>([])
	const [status, setStatus] = useState<'idle' | 'polling' | 'error'>('idle')
	const [message, setMessage] = useState('')
	const isPolling = useRef(false)

	const poll = async () => {
		if (isPolling.current) return

		isPolling.current = true
		setStatus('polling')

		try {
			const res = await fetch('/api/poll', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})

			if (!res.ok) throw new Error('Polling failed')

			const data = await res.json()

			if (data.notifications.length > 0) {
				setNotifications(prev => [...prev, ...data.notifications])
			}

			setStatus('idle')
		} catch (err) {
			console.error('Polling error:', err)
			setStatus('error')
			await new Promise(resolve => setTimeout(resolve, 5000)) // Wait before retry
		} finally {
			isPolling.current = false
			// Continue polling
			poll()
		}
	}

	useEffect(() => {
		poll()

		return () => {
			isPolling.current = false
		}
	}, [])

	const sendNotification = async () => {
		if (!message.trim()) return

		try {
			await fetch('/api/poll', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: message.trim() }),
			})

			setMessage('')
		} catch (err) {
			console.error('Send error:', err)
		}
	}

	return (
		<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
			<h1>Long Polling Demo</h1>

			<div
				style={{
					padding: '10px',
					marginBottom: '20px',
					backgroundColor:
						status === 'polling'
							? '#e3f2fd'
							: status === 'error'
							? '#ffebee'
							: '#f5f5f5',
					borderRadius: '4px',
				}}
			>
				Status:{' '}
				{status === 'polling'
					? '🔄 Polling...'
					: status === 'error'
					? '❌ Error'
					: '✅ Connected'}
			</div>

			<div style={{ marginBottom: '20px' }}>
				<input
					type='text'
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={e => e.key === 'Enter' && sendNotification()}
					placeholder='Enter a notification message'
					style={{
						padding: '10px',
						width: '70%',
						marginRight: '10px',
						border: '1px solid #ccc',
						borderRadius: '4px',
					}}
				/>
				<button
					onClick={sendNotification}
					style={{
						padding: '10px 20px',
						backgroundColor: '#2196F3',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Send
				</button>
			</div>

			<div>
				<h2>Notifications ({notifications.length})</h2>
				<ul style={{ listStyle: 'none', padding: 0 }}>
					{notifications.map((notif, idx) => (
						<li
							key={idx}
							style={{
								padding: '10px',
								marginBottom: '10px',
								backgroundColor: '#fff',
								border: '1px solid #ddd',
								borderRadius: '4px',
							}}
						>
							{notif}
						</li>
					))}
				</ul>
				{notifications.length === 0 && (
					<p style={{ color: '#999' }}>
						No notifications yet. Send one to see it appear!
					</p>
				)}
			</div>
		</div>
	)
}

import { NextRequest, NextResponse } from 'next/server';

// Simulated data store (use database in production)
let notifications: string[] = [];
let waitingClients: ((value: string[]) => void)[] = [];

export async function GET(req: NextRequest) {
  const timeout = 30000; // 30 second timeout
  
  // If there's new data, return immediately
  if (notifications.length > 0) {
    const data = [...notifications];
    notifications = [];
    return NextResponse.json({ notifications: data, timestamp: Date.now() });
  }
  
  // Otherwise, wait for new data or timeout
  try {
    const data = await Promise.race([
      new Promise<string[]>((resolve) => {
        waitingClients.push(resolve);
      }),
      new Promise<string[]>((resolve) => {
        setTimeout(() => resolve([]), timeout);
      })
    ]);
    
    return NextResponse.json({ notifications: data, timestamp: Date.now() });
  } finally {
    // Clean up waiting clients
    waitingClients = waitingClients.filter(() => false);
  }
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  
  // Add notification
  notifications.push(message);
  
  // Notify all waiting clients
  waitingClients.forEach(resolve => resolve([...notifications]));
  waitingClients = [];
  notifications = [];
  
  return NextResponse.json({ success: true });
}
import { NextResponse } from 'next/server';
import { verifyCarCodeInRequest } from '@/lib/utils/verification';

export async function POST(request: Request) {
  const { success, error } = await verifyCarCodeInRequest(request);

  if (!success) {
    return NextResponse.json({ error }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}

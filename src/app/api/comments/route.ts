import { NextRequest, NextResponse } from "next/server";

import { getComments } from "@/features/comment/queries/get-comments";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');
  const offset = searchParams.get('offset');

  if (!ticketId) {
    return NextResponse.json({ error: 'ticketId is required' }, { status: 400 });
  }

  try {
    const comments = await getComments(ticketId, parseInt(offset || '0'));
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
} 
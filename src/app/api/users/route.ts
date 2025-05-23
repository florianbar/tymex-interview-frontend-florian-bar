import { NextResponse } from "next/server";

import { getUsers } from "./utils";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  // Simulate a delay of 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = await getUsers(id, name, email, page, limit);
  return NextResponse.json(users);
}


import { auth } from "@/lib/auth";
import { mongoClientPromise } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export async function GET(request: Request) {
  await mongoClientPromise;
  return handlers.GET(request);
}

export async function POST(request: Request) {
  await mongoClientPromise;
  return handlers.POST(request);
}

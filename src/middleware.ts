import { NextRequest, NextResponse } from "next/server";
import { validPass } from "./lib/validPass";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

export async function isAuthenticated(req: NextRequest) {
  const headers =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (headers == null) return false;

  const [username, password] = Buffer.from(headers.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await validPass(password, process.env.PASS as string))
  );
}

export const config = {
  matcher: "/admin/:path*",
};

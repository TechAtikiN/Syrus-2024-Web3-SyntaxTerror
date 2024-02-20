import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
    // const cookies = req.cookies.get("role");

    // if (!cookies || !cookies.value) {
    //   return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to the login page if role cookie is missing
    // }
  
    // const role = cookies.value;
  
    // // Create a URL object to extract the pathname
    // const url = new URL(req.url, "http://localhost");
  
    // if (role === "lawyer" && url.pathname.startsWith("/court")) {
    //   return NextResponse.redirect(new URL("/lawyer", req.url)); 
    // } else if (role === "court" && url.pathname.startsWith("/lawyer")) {
    //   return NextResponse.redirect(new URL("/court", req.url)); // Redirect court to the court route
    // } else if (role !== "lawyer" && role !== "court") {
    //   return NextResponse.redirect(new URL("/", req.url)); // Redirect to the home page if role is neither lawyer nor court
    // }
  
    return NextResponse.next();
  }

export const config = {
  matcher: [
    "/",
 

    "/lawyer/:paths*", // Add the lawyer route
    "/court/:paths*", // Add the court route
  ],
};

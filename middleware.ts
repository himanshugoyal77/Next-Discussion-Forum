import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "sign-in", "sign-up", "sign-out"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/api/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/api/(.*)"],
};

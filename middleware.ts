cat > middleware.ts <<'EOF'
import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"
  ]
};
EOF

rm -f proxy.ts

npm run lint
npm run test
npm run build:cloudflare

git add -A
git commit -m "fix(deploy): use edge middleware for Cloudflare OpenNext"
git push

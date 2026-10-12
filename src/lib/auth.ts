import "server-only";
import { cookies } from "next/headers";

// Second check for host-only actions (middleware is the first). Server actions
// and the upload route call this so they can't be used without logging in.
export async function isHost() {
  const password = process.env.HOST_PASSWORD;
  if (!password) return false;
  return (await cookies()).get("host_access")?.value === password;
}

export async function requireHost() {
  if (!(await isHost())) throw new Error("Not signed in as host.");
}

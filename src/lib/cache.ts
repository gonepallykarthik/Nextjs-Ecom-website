import { unstable_cache as ncache } from "next/cache";
import { cache as rcache } from "react";

type callback = (...args: any[]) => Promise<any>;
export function cache<T extends callback>(
  cb: T,
  parts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  return ncache(rcache(cb), parts, options);
}

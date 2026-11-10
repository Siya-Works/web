import { loadEnvConfig } from "@next/env";
import { writeFileSync } from "node:fs";
loadEnvConfig(process.cwd());
const publisher = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
if (/^ca-pub-\d{16}$/.test(publisher))
  writeFileSync(
    "out/ads.txt",
    `google.com, ${publisher.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`,
  );

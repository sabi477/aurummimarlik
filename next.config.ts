import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bir üst dizinde başka bir package-lock.json bulunduğu için kökü açıkça
  // bu projeye sabitliyoruz.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;

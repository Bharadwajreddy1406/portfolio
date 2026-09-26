import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
}

export default function nextConfig(phase) {
  return {
    ...baseConfig,
    // Keep the dev artifacts isolated on Windows while leaving production output
    // in Next.js/Vercel's standard `.next` directory.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  }
}

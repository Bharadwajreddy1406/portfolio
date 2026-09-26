import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
}

export default function nextConfig(phase) {
  return {
    ...baseConfig,
    // Keep dev and production build artifacts isolated to avoid Windows rename races.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next-build',
  }
}

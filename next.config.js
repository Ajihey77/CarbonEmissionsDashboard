/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    // 빌드 시 타입 체크를 건너뛰려면 true로 설정
    ignoreBuildErrors: false,
  },
  eslint: {
    // 빌드 시 ESLint 오류를 무시하려면 true로 설정
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig


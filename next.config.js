/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Le formulaire /soumission de ce site n'envoyait rien : on redirige vers le formulaire
  // de la plateforme, qui enregistre la demande et avertit l'équipe.
  async redirects() {
    return [
      { source: '/soumission', destination: 'https://www.zeniva.ca/projet?division=toiture', permanent: false },
    ];
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'fakestoreapi.com',
      'm.media-amazon.com',
      'i.imgur.com'
    ]
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  }
}

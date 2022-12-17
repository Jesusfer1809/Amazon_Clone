/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import User from 'models/UserModel'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from 'utils/mongodb'
import { dbConnect } from 'utils/mongoose'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
  events: {
    async createUser(message) {
      await dbConnect()
      const newUser = await User.findOne({ email: message.user.email })
      await newUser.save()
    }
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)

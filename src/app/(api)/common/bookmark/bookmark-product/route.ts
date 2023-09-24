import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Bookmark from '@/model/bookmark'
import Joi from 'joi'


const bookmark = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required()
})


export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await connectDatabase()
    const isAuthenticated = await AuthCheck(req)

    if (isAuthenticated) {
      const data = await req.json()
      const { productID, userID } = data

      const { error } = bookmark.validate({ productID, userID })

      if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') })

      const findProd = await Bookmark.find({ productID: productID, userID: userID })
      if (findProd?.length > 0) return NextResponse.json({
        success: false,
        message: 'Product is Already in Favourites'
      })

      const saveData = await Bookmark.create(data)

      if (saveData) {
        return NextResponse.json({ success: true, message: 'Product added to Favourites!' })
      } else {
        return NextResponse.json({ success: false, message: 'Failed to add product to Favourites. Please try again!' })
      }
    } else {
      return NextResponse.json({ success: false, message: 'You are not authorized Please login!' })
    }
  } catch (error) {
    console.log('Error in adding a product to bookmark :', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}

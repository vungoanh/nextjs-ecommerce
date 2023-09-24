import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Cart from '@/model/cart'
import Joi from 'joi'


const AddToCart = Joi.object({
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

      const { error } = AddToCart.validate({ productID, userID })

      if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') })

      const findProd = await Cart.find({ productID: productID, userID: userID })
      if (findProd?.length > 0) return NextResponse.json({ success: false, message: 'Product is Already in Cart' })

      const saveData = await Cart.create(data)

      if (saveData) {
        return NextResponse.json({ success: true, message: 'Product added to Cart!' })
      } else {
        return NextResponse.json({ success: false, message: 'Failed to add product to cart. Please try again!' })
      }
    } else {
      return NextResponse.json({ success: false, message: 'You are not authorized Please login!' })
    }
  } catch (error) {
    console.log('Error in adding a product to cart :', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}

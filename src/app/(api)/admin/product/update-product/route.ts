import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Product from '@/model/product'

export async function PUT(req: Request) {
  try {
    await connectDatabase()
    const isAuthenticated = await AuthCheck(req)

    if (isAuthenticated === 'admin') {
      const data = await req.json()
      const { name, _id, description, slug, feature, quantity, price, categoryID } = data

      const saveData = await Product.findOneAndUpdate(_id, {
        productName: name,
        productDescription: description,
        productSlug: slug,
        productPrice: price,
        productQuantity: quantity,
        productCategory: categoryID
      }, { new: true })

      if (saveData) {

        return NextResponse.json({ success: true, message: 'product  updated successfully!' })

      } else {

        return NextResponse.json({ success: false, message: 'Failed to update the product . Please try again!' })

      }

    } else {

      return NextResponse.json({ success: false, message: 'You are not authorized.' })

    }

  } catch (error) {

    console.log('Error in update a new product :', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })

  }
}

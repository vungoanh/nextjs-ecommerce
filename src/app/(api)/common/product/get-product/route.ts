import connectDatabase from '@/database/connect-database'

import { NextResponse } from 'next/server'
import Product from '@/model/product'


export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDatabase()
  try {


    const getData = await Product.find({}).populate('productCategory', ' categoryName categorySlug _id')
    if (getData) {
      return NextResponse.json({ success: true, data: getData })
    } else {
      return NextResponse.json({ status: 204, success: false, message: 'No products found.' })
    }

  } catch (error) {
    console.log('Error in getting all products:', error)
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' })
  }
}
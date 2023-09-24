import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Category from '@/model/category'


export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDatabase()
  try {


    const getData = await Category.find({})
    if (getData) {
      return NextResponse.json({ success: true, data: getData })
    } else {
      return NextResponse.json({ status: 204, success: false, message: 'No categories found.' })
    }

  } catch (error) {
    console.log('Error in getting all categories:', error)
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' })
  }
}

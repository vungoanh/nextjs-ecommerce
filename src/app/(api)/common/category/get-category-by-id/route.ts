import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Category from '@/model/category'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDatabase()
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ status: 400, success: false, message: 'Please provide category id.' })


    const isAuthenticated = await AuthCheck(req)


    const getData = await Category.findById(id)
    if (getData) {
      return NextResponse.json({ success: true, data: getData })
    } else {
      return NextResponse.json({ status: 204, success: false, message: 'No categories found.' })
    }

  } catch (error) {
    console.log('Error in getting  categories by id:', error)
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' })
  }
}

import connectDatabase from '@/database/connect-database'
import { NextResponse } from 'next/server'
import Order from '@/model/order'
import AuthCheck from '@/middleware/auth-check'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDatabase()
  try {
    const isAuthenticated = await AuthCheck(req)

    if (isAuthenticated === 'admin') {
      const getData = await Order.find({}).populate('orderItems.product').populate('user')
      if (getData) {
        return NextResponse.json({ success: true, data: getData })
      } else {
        return NextResponse.json({ status: 204, success: false, message: 'No bookmark Item found.' })
      }

    } else {
      return NextResponse.json({ success: false, message: 'You are not authorized Please login!' })
    }


  } catch (error) {
    console.log('Error in getting all Orders data :', error)
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' })
  }
}
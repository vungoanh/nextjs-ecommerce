import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Order from '@/model/order'

export async function PUT(req: Request) {
  try {
    await connectDatabase()
    const isAuthenticated = await AuthCheck(req)

    if (isAuthenticated === 'admin') {
      const data = await req.json()
      const id = data
      console.log(id)
      if (!id) return NextResponse.json({ success: false, message: 'Please provide the order id!' })

      const saveData = await Order.findOneAndUpdate(id, { isDelivered: true }, { new: true })

      if (saveData) {

        return NextResponse.json({ success: true, message: 'Order status updated successfully!' })

      } else {

        return NextResponse.json({ success: false, message: 'Failed to update the Order status. Please try again!' })

      }

    } else {

      return NextResponse.json({ success: false, message: 'You are not authorized.' })

    }

  } catch (error) {

    console.log('Error in update order status:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })

  }
}

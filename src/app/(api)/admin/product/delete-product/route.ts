import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Product from '@/model/product'


export async function DELETE(req: Request) {
  try {
    await connectDatabase()
    const isAuthenticated = await AuthCheck(req)

    if (isAuthenticated === 'admin') {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get('id')

      if (!id) return NextResponse.json({ success: true, message: 'Product ID is Required' })

      const deleteData = await Product.findByIdAndDelete(id)

      if (deleteData) {
        return NextResponse.json({ success: true, message: 'Product Deleted successfully!' })
      } else {
        return NextResponse.json({ success: false, message: 'Failed to Delete the Product. Please try again!' })
      }
    } else {
      return NextResponse.json({ success: false, message: 'You are not authorized.' })
    }
  } catch (error) {
    console.log('Error in deleting a new Product:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}

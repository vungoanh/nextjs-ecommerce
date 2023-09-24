import connectDatabase from '@/database/connect-database'
import AuthCheck from '@/middleware/auth-check'
import { NextResponse } from 'next/server'
import Bookmark from '@/model/bookmark'


export async function DELETE(req: Request) {
  try {
    await connectDatabase()
    const isAuthenticated = await AuthCheck(req)

    if (isAuthenticated) {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get('id')

      if (!id) return NextResponse.json({ success: true, message: 'Bookmark Item  ID is Required' })

      const deleteData = await Bookmark.findByIdAndDelete(id)

      if (deleteData) {
        return NextResponse.json({ success: true, message: 'Bookmark Item  Deleted successfully!' })
      } else {
        return NextResponse.json({ success: false, message: 'Failed to Delete the bookmark Item . Please try again!' })
      }
    } else {
      return NextResponse.json({ success: false, message: 'You are not authorized.' })
    }
  } catch (error) {
    console.log('Error in deleting a bookmark item :', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' })
  }
}

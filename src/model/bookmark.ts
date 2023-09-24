import mongoose from 'mongoose'
import User from './user'
import Product from './product'

const BookmarkSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }
}, { timestamps: true })

const Bookmark = mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema)
export default Bookmark
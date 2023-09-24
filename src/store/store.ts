'use client'


import { AdminNavReducer } from '@/utils/admin-nav-slice'
import { AdminReducer } from '@/utils/admin-slice'
import { UserReducer } from '@/utils/user-data-slice'
import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '@/utils/cart-slice'
import { bookmarkReducer } from '@/utils/book-mark'
import { OrderReducer } from '@/utils/order-slice'


export const store = configureStore({
  reducer: {
    User: UserReducer,
    AdminNav: AdminNavReducer,
    Admin: AdminReducer,
    Cart: cartReducer,
    Bookmark: bookmarkReducer,
    Order: OrderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
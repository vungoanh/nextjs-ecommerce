import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import TileContainer from './tile-container'
import ProductDataTable from './product-data-table'
import CategoryDataTable from './category-data-table'
import PendingOrdersDaataTable from './pending-orders-daata-table'
import CompletedOrderDataTable from './completed-order-data-table'

export default function SuperComponent() {
  const navActive = useSelector((state: RootState) => state.AdminNav.ActiveNav)
  switch (navActive) {
    case 'Base':
      return <TileContainer />
    case 'activeProducts':
      return <ProductDataTable />
    case 'activeCategories':
      return <CategoryDataTable />
    case 'activePendingOrder':
      return <PendingOrdersDaataTable />
    case 'activeDeliveredOrder':
      return <CompletedOrderDataTable />
    default:
      return <TileContainer />
  }
}

export const dynamic = 'force-dynamic'
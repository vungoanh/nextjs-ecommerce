'use client'
import React, { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import FeaturedProduct from '@/components/featured-product'
import TopCategories from '@/components/top-categories'
import { get_all_categories } from '@/services/admin/category'
import { get_all_products } from '@/services/admin/product'
import useSWR from 'swr'
import { toast, ToastContainer } from 'react-toastify'
import { setCategoryData, setCatLoading, setProdLoading, setProductData } from '@/utils/admin-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from './loading'
import { setUserData } from '@/utils/user-data-slice'
import { RootState } from '@/store/store'


export default function Home() {
  const dispatch = useDispatch()
  const categoryLoading = useSelector((state: RootState) => state.Admin.catLoading)
  const productLoading = useSelector((state: RootState) => state.Admin.productLoading)
  const [loading, setLoading] = useState(true)
  const [ratio, setRatio] = useState(16 / 9)
  useEffect(() => {
    toast.warning('Application is under development , some features may not work properly')
    toast.warning('This is a demo website, you can not buy anything from here')
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) return
    dispatch(setUserData(JSON.parse(userData)))
  }, [])


  useEffect(() => {
    FetchDataOFProductAndCategory()
  }, [])


  const FetchDataOFProductAndCategory = async () => {

    const categoryData = await get_all_categories()
    if (categoryData?.success !== true) toast.error(categoryData?.message)

    dispatch(setCategoryData(categoryData?.data))


    const productData = await get_all_products()
    if (productData?.success !== true) toast.error(productData?.message)


    dispatch(setProductData(productData?.data))


    setLoading(false)
  }

  useEffect(() => {
    dispatch(setCatLoading(loading))
    dispatch(setProdLoading(loading))
  }, [categoryLoading, productLoading, dispatch, loading])


  return (
    <>
      <Navbar />
      <Hero setRatio={setRatio} />
      {
        loading ? <Loading /> :
          <>

            <TopCategories />
            <FeaturedProduct />
            <Footer />

          </>
      }
      <ToastContainer />
    </>
  )
}

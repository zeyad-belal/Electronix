/* eslint-disable react/prop-types */
import Slider from '../UI/Slider'

function BestSellerSlider({products}) {
  return (
    <div className="mt-5">
    <h1 className='mx-12 font-bold text-3xl'>Best Sellers</h1>
    <Slider products={products} />
    </div>
  )
}

export default BestSellerSlider
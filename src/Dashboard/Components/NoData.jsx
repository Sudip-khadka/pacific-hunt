import React from 'react'
import noData from '../../assets/Dashboard/noData.png'
function NoData() {
  return (
    <div className="no-data flex flex-col items-center gap-5">
           <img src={noData} alt="no data available" />
           <h2 className='text-[#3C3D3D] text-base font-medium'>No Data Available</h2>
    </div>
  )
}

export default NoData

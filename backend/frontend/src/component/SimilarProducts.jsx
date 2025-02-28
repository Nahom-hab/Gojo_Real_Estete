import React from 'react'
import ScrollCard from './scrollCard';

export default function SimilarProducts({ data, text }) {

    return (
        <div>
            <div className='flex flex-col mb-10 items-center justify-center'>
                <div className='w-[86%] text-xl  md:text-3xl mb-6 font-bold'>{text}:</div>


                <div className='grid grid-cols-1  lg:grid-cols-4  sm:grid-cols-2 gap-4 md:grid-cols-3  w-[90%] md:w-fit justify-center'>
                    {data?.map((res) => <ScrollCard key={res._id} result={res} />)}
                </div>
            </div>

        </div>
    )
}

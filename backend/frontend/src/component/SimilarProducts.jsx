import React from 'react'
import ScrollCard from './scrollCard';

export default function SimilarProducts({ data, text }) {

    return (
        <div>
            <div className='flex flex-col mb-10 items-center justify-center'>
                <div className='w-[86%] text-3xl mb-6 font-bold'>{text}:</div>


                <div className='grid w-fit lg:grid-cols-4  sm:grid-cols-2 gap-4 md:grid-cols-3   justify-center'>
                    {data?.map((res) => <ScrollCard key={res.name} result={res} />)}
                </div>
            </div>

        </div>
    )
}

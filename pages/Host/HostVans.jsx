import React from "react";
import { 
        Link, 
        useLoaderData,
        defer,
        Await
     } from "react-router-dom";
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"

export async function loader({request}){
    await requireAuth(request)
    return defer({vans: getHostVans()})
}

export default function HostVans(){
    const dataPromise = useLoaderData();

    function renderVanElements(vans) {
        const vanList = vans.map( van => (
            <Link to={van.id} key={van.id}>
                <div key={van.id}>
                    <img className="van-img" src={van.imageUrl} alt="" />
                    <div>
                        <p className="van-name">{van.name}</p>
                        <p className="van-price">${van.price}/day</p>
                    </div>  
                </div>
            </Link>
        ))
        return (
            <div className="vanslist--card">
                        <section>
                            {vanList}
                        </section>
                    </div>
            )
    }

    return (
        <div className="vanslist">
            <h1>Your Listed vans list</h1>
            <React.Suspense fallback={<h3>Loading vans data...</h3>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </React.Suspense>
            
        </div>
        
    )
}
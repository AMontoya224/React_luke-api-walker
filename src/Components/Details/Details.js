import './Details.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Details( props ){
    const [isLoading, setLoading] = useState( true );
    const [homeworld, setHomeworld] = useState( '' );
    let url = props.SWList.homeworld;

    useEffect(()=>{
        axios.get( `${url}`)
            .then( response => {
                setHomeworld( response.data.name );
                setLoading( false );
            })
            .catch( err => {
                console.log( err );
            })
    }, [url]);

    if ( isLoading ) {
        return <div></div>;
    };
    
    return(
        <div className="details">
            <h1>
                {props.SWList.name}
            </h1>
            <p>
                <b>Height:</b> {props.SWList.height}
            </p>
            <p>
                <b>Hair Color:</b> {props.SWList.hair_color}
            </p>
            <p>
                <b>Birth Year:</b> {props.SWList.birth_year}
            </p>
            <p>
                <b>Homeworld:</b> {homeworld}
            </p>
        </div>
    );
};
export default Details;
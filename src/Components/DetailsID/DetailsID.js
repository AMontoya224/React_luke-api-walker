import { useState, useEffect } from 'react';
import axios from 'axios';
import Error from '../Error/Error';


function DetailsID( props ){
    const [SWList, setSWList] = useState( [] );
    const [isLoading, setLoading] = useState( true );
    const [homeworld, setHomeworld] = useState( '' );
    const [error, setError] = useState( null );
    let url = SWList.homeworld;

    useEffect(()=>{
        axios.get( `https://swapi.dev/api/people/${props.match.params.id}` )
            .then( response => {
              setSWList( response.data );
              setError( null );
            })
            .catch( err => {
                setError( err );
            })
    }, [props.match.params.id]);

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

    if ( error !== null ){
        return (
          <div className="App">
            <Error />
          </div>
        );
    };

    if ( isLoading ) {
        return <div></div>;
    };

    return(
        <div className="App">
            <div className="details">
                <h1>
                    {SWList.name}
                </h1>
                <p>
                    <b>Height:</b> {SWList.height}
                </p>
                <p>
                    <b>Hair Color:</b> {SWList.hair_color}
                </p>
                <p>
                    <b>Birth Year:</b> {SWList.birth_year}
                </p>
                <p>
                    <b>Homeworld:</b> {homeworld}
                </p>
            </div>
        </div>
    );
};
export default DetailsID;
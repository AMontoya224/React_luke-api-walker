import { useState, useEffect } from 'react';
import axios from 'axios';



function SWForm( props ){
    const [isLoading, setLoading] = useState( true );
    const [categoryList, setCategoryList] = useState( [] );

    useEffect(()=>{
        axios.get( 'https://swapi.dev/api/' )
            .then( response => {
                const categoryList = response.data;
                setCategoryList( Object.keys(categoryList) );
                setLoading( false );
            })
            .catch( err => {
                console.log( 'err ' + err );
            })
    }, []);

    if ( isLoading ) {
        return <div>Loading...</div>;
    };

    return(
        <form onSubmit={props.SWSearch}>
            <div>
                <label htmlFor="category">
                    Search for:
                </label>
                <select  id="category" value={props.searchForm.category} onChange={( e ) => props.SWSearchForm( 'category', e.target.value )}>
                    <option value=' '>-- Seleccionar --</option>
                    {
                        categoryList.map( (categoryItem, i) => 
                        <option key={i} value={categoryItem}>{categoryItem}</option> )
                    }
                </select>
            </div>
            <div>
                <label htmlFor="idTodo">
                    ID todo:
                </label>
                <input type="number" id="idTodo" value={props.searchForm.id} onChange={( e ) => props.SWSearchForm( 'id', e.target.value )} />
            </div>
            <button type="submit">
                Agregar
            </button>
        </form>
    )
};
export default SWForm;
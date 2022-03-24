import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SWForm from './Components/SWForm/SWForm';
import Details from './Components/Details/Details';
import Error from './Components/Error/Error';
import DetailsID from './Components/DetailsID/DetailsID';

function App() {
  const initialSearch = {
    category : '',
    id : ''
  };
  const [search, setSearch] = useState( initialSearch );
  const [searchForm, setSearchForm] = useState( initialSearch );
  const [SWList, setSWList] = useState( [] );
  const [error, setError] = useState( null );

  const SWSearchForm = ( property, value ) => {
    setSearchForm( {
      ...searchForm,
      [property] : value
    } );
  };

  const SWSearch = ( e ) => {
    e.preventDefault();
    setSearch( searchForm );
  };

  useEffect(()=>{
    axios.get( `https://swapi.dev/api/${search.category}/${search.id}` )
        .then( response => {
          setSWList( response.data );
          setError( null );
        })
        .catch( err => {
          setError( err );
        })
  }, [search]);

  if ( error !== null ){
    return (
      <div className="App">
        <SWForm SWSearch={SWSearch} SWSearchForm={SWSearchForm} searchForm={searchForm} />
        <Error />
      </div>
    );
  };

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/:id" render={ (routeProps) => <DetailsID SWList={SWList} {...routeProps}/> } />
          <Route path="/" render={ (routeProps) => {
            return (
              <div className="App">
                <SWForm SWSearch={SWSearch} SWSearchForm={SWSearchForm} searchForm={searchForm} {...routeProps} />
                <Details SWList={SWList} {...routeProps} />
              </div>
            )
          } } />
          
        </Switch>
    </BrowserRouter>
  );
}

export default App;

import './Error.css';

function Error(){
    return(
        <div className='error'>
            <h1>
                "Estos no son los droides que estaba buscando"
            </h1>
            <img src={require('../../Images/obi-wan-kenobi.jpg')} alt="obi-wan" />
        </div>
    )
};
export default Error;
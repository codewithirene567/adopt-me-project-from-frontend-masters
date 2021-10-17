import { Link } from 'react-router-dom'

const Pet = ({
    name,
    animal,
    breed,
    images,
    location,
    id
}) => {
    let hero = 'http://pets-images.dev-apis.com/pets/none.jpg'
    if(images.length){
        hero=images[0]
    }
    //if you use an anchor tag it will send you to a different page
    //SPA for link to not send you to a different page
    return(
        <Link to={`/details/${id}`} className="pet">
            <div className="image-container">
                <img src={hero} alt={name} />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>{`${animal} - ${breed} - ${location}`}</h2>
            </div>
        </Link>
    )
}

//note:if you set your node env variable to development it will make things 4 times bigger
//switch it to production if you are using webpacker
//irenes@Irenes-MacBook-Air ~ % echo $NODE_ENV
//irenes@Irenes-MacBook-Air ~ % NODE_ENV=development && echo $NODE_ENV
//development

//parcel and webpacker are web application bundlers - tracks, bundles all files and 
//dependencies and converts these modules of code into static assets, these
//assets get displayed in the HTML

export default Pet
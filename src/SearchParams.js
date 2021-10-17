import {useState, useEffect, useContext} from 'react';
// import Pet from "./Pet"
import ThemeContext from './ThemeContext'
import Results from './Results';
import useBreedList from './useBreedList'

const ANIMALS = ["Rat", "mouse", 'cat', 'dog']

const SearchParams = () => {
    //you can put useState intial arguments as anything
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [pets, setPets] = useState([])
    const [breeds] = useBreedList(animal);
    const [themeHook, setTheme] = useContext(ThemeContext)
    //this came from the context from App
    
//same as component did mount, happens after the first render of SearchParams component
    useEffect(() => {
        requestPets()
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

// useEffect(() =>{
//     const timer = setTimeout(()=>alert('hi'), 3000)
    //if you were to remove animal from the DOM, you would still have this happen
    //so that would be called a memory leak
    //the below line gets rid of that
//     return () => clearTimeout(timer)
// }, [animal])

//rerun after every render if no array is given
//empty array means don't track only, only render it once, I will call requestPets() myself

//we are writing code that is going to fetch from our API of breeds when an animal
//is selected
    async function requestPets () {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        //json will be whatever we got back from the API
        const json = await res.json()
        console.log(json);

        setPets(json.pets)
    }

    // const locationTuple = useState("Seattle, WA")
    // const location = locationTuple[0]
    // const setLocation = locationTuple[1]
//don't put hooks inside of for loops or if statements

    return(
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    requestPets();
                }}>
                <label htmlFor="location">
                    Location
                    <input id="location" onChange={e=> setLocation(e.target.value)}
                    value={location} placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    <select
                        id="animal"
                        value={animal}
                        onChange={e=> setAnimal(e.target.value)}
                        onBlur={e=> setAnimal(e.target.value)}
                    >
                        <option />
                        {/* we need to put something that is going to distinguish the
                        elements in our array - reason for the key */}
                        {
                            ANIMALS.map(animal => (
                                <option value={animal} key={animal}>
                                    {animal}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="breed">
                    <select
                        id="breed"
                        value={breed}
                        onChange={e=> setBreed(e.target.value)}
                        onBlur={e=> setBreed(e.target.value)}
                    >
                        <option />
                        {/* we need to put something that is going to distinguish the
                        elements in our array - reason for the key */}
                        {
                            breeds.map(breed => (
                                <option value={breed} key={breed}>
                                    {breed}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="theme">
                    Theme
                        <select
                        value={themeHook}
                        onChange={e=> setTheme(e.target.value)}
                        onBlur={e=> setTheme(e.target.value)}>
                            <option value="darkblue">Dark Blue</option>
                            <option value="red">Red</option>
                            <option value="peru">Peru</option>
                        </select>
                </label>
                <button style={{backgroundColor:themeHook}}>Submit</button>
            </form>
          <Results pets={pets} />
        </div>
    )
}

//there are certain words reserved for javascript which is why jsx has to use className 
//instead for example

//the curly braces really mean it's a javscript expression
export default SearchParams;
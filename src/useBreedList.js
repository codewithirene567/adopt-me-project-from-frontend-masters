//purpose is to call a list of breeds based on the animal selected
import {useState, useEffect} from 'react';

const localCache = {};

export default function useBreedList(animal){
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState('unloaded');
    //is it loading or not loading?

    useEffect(()=>{
        if(!animal){
            setBreedList([])
        } else if (localCache[animal]){
            setBreedList(localCache[animal])
        } else {
            requestBreedList()
        }
        async function requestBreedList() {
            setBreedList([]);
            setStatus('Loading');
    
            const response = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )
            const json = await response.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal])
            setStatus('Loaded')
        }
    }, [animal])

    return [breedList, status]
    
}
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast} from 'react-hot-toast'

export default function useCharacter(searchInput){
    const[characters, setCharacters] = useState([])
    const[isLoading,setIsLoading] = useState(false)

    useEffect( ()=>{
        const controller = new AbortController();
        const signal = controller.signal;
    
        async function fetchData() {
            try {
                setIsLoading(true)
                const res = await axios.get(`https://rickandmortyapi.com/api/character?name=${searchInput}`, {signal}) 
                setCharacters(res.data.results.slice(0,4)) 
            } catch (error) {
                if(!axios.isCancel()){
                    setCharacters([])
                    toast.error(error.respone.data.error) 
                }
            } finally {
                setIsLoading(false)
            }
          
        }
        fetchData(); 
        return ()=>{
          controller.abort();
        }
    },[searchInput])

    return {isLoading ,characters} 
}
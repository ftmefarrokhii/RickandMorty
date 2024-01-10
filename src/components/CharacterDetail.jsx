import { useEffect, useState } from 'react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import toast from 'react-hot-toast'

function CharacterDetail({selectedId , favoriteCharacters , addToFavoriteCharacters , isAddedToFavorites}){
    const[char, setChar] = useState(null)
    const[isLoading,setIsLoading] = useState(false)
    const[episodes,setEpisodes] = useState([])

    useEffect(()=>{
        async function fetchData(){
            try {
                setIsLoading(true)
                setChar(null)
                const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
                setChar(data);
                console.log("ress", data)
                const episodeId = data.episode.map(e => e.split("/").at(-1)) 
                const {data : episodeData} = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
                setEpisodes([episodeData].flat().slice(0,4))  
            } catch (error) {
                toast.error(error.response.data.error)
            }finally{
                setIsLoading(false)
            }
            
        }
        if(selectedId) fetchData();
        
    },[selectedId]);

    if(isLoading) return <div className='right-sidebar'>please wait...</div>

    if(!char || !selectedId) return <div className='right-sidebar'>please select character</div>
    return(
        <div style={{flex: 1}}>
            <CharacterSubInfo char={char} isAddedToFavorites={isAddedToFavorites} addToFavoriteCharacters={addToFavoriteCharacters}/>
            <EpisodeList episodes={episodes}/>
        </div>
    )
}

export default CharacterDetail

function CharacterSubInfo({char , isAddedToFavorites , addToFavoriteCharacters}){
    return(
        <div className="character-detail">
                
        <img src={char.image} alt={char.name} className='character-detail__img'/>
        <div className="character-detail__info">
            <h3 className='name'>
                <span>{char.gender == 'Male' ? "👱🏻‍♂️" : "👩🏻‍🦳"} </span>
                <span>{char.name}</span>
            </h3>
            <div className="info">
                <span className={`status ${char.status== "Dead" ? "red" : ""}`}></span>
                <span> {char.status}</span>
                <span> - {char.species}</span>
            </div>
            <div className='location'>
                <p>Last Known Location : </p>
                <p>{char.location.name}</p>
            </div>
            <div className="actions">
                {isAddedToFavorites ? <p>alredy added to favorites</p> : 
                <button className='btn btn--primary' 
                    onClick={()=> addToFavoriteCharacters(char) }>Add to favorites
                </button>
                }
            </div>
            
        </div>
    </div>
    )
}
function EpisodeList({episodes}){
    const[sortedBy, setSorted] = useState(true)

    let sortedEpisodes;
    if(sortedBy){
        sortedEpisodes =[ ...episodes].sort((a,b)=> new Date(a.created) - new Date(b.created)) // earliest
    }else{
        sortedEpisodes =[ ...episodes].sort((a,b)=> new Date(b.created) - new Date(a.created))  //latest
    }
    return(
        <div className="character-episodes">
        <div className="title">
            <h2>List of Episodes:</h2>
            <button> <ArrowDownCircleIcon className='icon' style={{rotate : sortedBy ? "0deg" : "180deg"}}
                onClick={()=> setSorted((is)=>!is)} />
            </button>
        </div>
        <ul>
            {sortedEpisodes.map((item , index)=>( 
                <li key={item.id}>
                    <div>
                    {String(index + 1).padStart(2, "0")}  - {item.episode} : <strong>{item.name}</strong>
                    </div>
                    <div className='badge badge--secondary'>{item.air_date}</div>
                </li>  
            )
            )}
        </ul>
        
    </div>
    )
}
import Character from './Character'
import { EyeIcon , EyeSlashIcon } from "@heroicons/react/24/outline"

function CharacterList({characters , isLoading , onSelectCharacter , selectedId}){
    if(isLoading){
        return(
            <div className="characters-list">
                 <h1>loading...</h1>
            </div>   
        )
    }
    return(
        <div className="characters-list">
            {characters.map((character)=> 
                <Character key={character.id} character={character} >
                    <button className="icon red" onClick={() => onSelectCharacter(character.id)}> 
                        {selectedId == character.id ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                </Character>
            )}
        </div>
    )
}

export default CharacterList
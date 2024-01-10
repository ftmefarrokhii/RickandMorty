import Navbar from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import { useState } from 'react'
import './App.css'
import {Toaster} from 'react-hot-toast'

import useCharacter from './hooks/useCharacter'
import useLocalStorage from './hooks/useLocalStorage'
function App() {
  
  const[searchInput,setSearchInput] = useState("")
  const[selectedId,setSelectedId] = useState("")
  const {isLoading , characters} = useCharacter(searchInput)
  const [favoriteCharacters,setFavoriteCharacters] = useLocalStorage("Favorites" , []);
  
  function selectCharacter(id){
    setSelectedId(prevId => prevId == id ? null : id)
  }
  const isAddedToFavorites = favoriteCharacters.map((f) => f.id ).includes(selectedId) 

  function addToFavoriteCharacters(char){
    setFavoriteCharacters(prevFav => [...prevFav,char])
  }

  function handleRemoveFavorite(id){
    setFavoriteCharacters((prevFav) => prevFav.filter((fav) => fav.id != id))
  }
  return (
    <div className='app'>
      <Toaster />
      <Navbar numOfResults={characters.length} searchInput={searchInput} 
        setSearchInput={setSearchInput} Favorites={favoriteCharacters} onRemoveFavorite={handleRemoveFavorite}
      />
      <div className='main'> 
        <CharacterList characters={characters} isLoading={isLoading}
           onSelectCharacter={selectCharacter} selectedId={selectedId}
        />
        <CharacterDetail selectedId={selectedId} favoriteCharacters={favoriteCharacters}
           addToFavoriteCharacters={addToFavoriteCharacters} isAddedToFavorites={isAddedToFavorites}
        />
      </div>
    </div>
  )
}

export default App

import {HeartIcon, TrashIcon} from '@heroicons/react/24/outline'
import { useState } from 'react'
import Modal from './Modal'
import Character from './Character'

function Navbar({numOfResults, searchInput ,setSearchInput , Favorites ,onRemoveFavorite}){
    const[open,setOpen] = useState(false)

    return(
        <div className="navbar">
            <div className="navbar__logo">LOGO 😍</div>
            <input className="text-field" type="text" placeholder="search..." value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="navbar__result">found {numOfResults} characters</div>


            <Modal title="title" open={open} onOpen={setOpen}>
                {Favorites.map((fav)=>{
                    return (
                        <Character character={fav} key={fav.id}>
                            <button><TrashIcon className='icon red' 
                                onClick={()=> onRemoveFavorite(fav.id) }/>
                            </button>
                        </Character>
                    )
                })}
                
            </Modal>
            <button className="heart" onClick={()=> setOpen(open => !open)}>
                <HeartIcon className='icon' />
                <span className='badge'>{Favorites.length}</span>
            </button>
        </div>
    )
}

export default Navbar

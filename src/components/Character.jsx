function Character({character,children}){
    
    return(
        <div className="list__item">
            <img src={character.image} alt={character.name}/>
            <CharacterName character={character} />
            <CharacterInfo character={character} />
            
            {children}        
        </div>
    )
}
export default Character

export function CharacterName({character}){
    return(
        <h3 className="name">
            <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
            <span>{character.name}</span>
        </h3>
    )
}
export function CharacterInfo({character}){
    return(
        <div className="list-item__info info">
            <span className={`status ${character.status== "Dead" ? "red" : ""}`}></span>
            <span> {character.status}</span>
            <span> - {character.species}</span>
        </div>   
    )
}

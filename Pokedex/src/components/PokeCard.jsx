import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import Typecard from "./TypeCard";

export default function PokeCard(props) {
    const {selectedPokemon} = props;
    
    const[data, setData] = useState(null);
    const[loading, setLoading] = useState(false);

    const {name, height, ability, stats, types, moves, sprites } = data || {}


    useEffect(()=>{

        //if loading, exit logic

        // if(!loading || !localStorage || !data){ return }

        //check if selected pokemon information is available in cache
        //1. define cache
        let isMounted = true;
        let localCache = {} ;

        //2. check if selected pokemon is in cache otherwise fetch from api

        if(localStorage.getItem('pokedex')){
            localCache = JSON.parse(localStorage.getItem('pokedex'));
            
        }

        if(selectedPokemon in localCache){
            setData(localCache[selectedPokemon]);
            console.log("Found Pokémon in cache", localCache[selectedPokemon]);
            return;
        }

        // we passed all the cache memory and could not find the required pokemon. now we try to fetch the information
        // from the api call;
        
        async function fetchPokemonData() {
            setLoading(true)
            try{
                let url = `https://pokeapi.co/api/v2/pokemon/${getPokedexNumber(selectedPokemon)}`; //String(selectedPokemon).toLowerCase() is selectedPokemon 
                                                                                                    // was a string (for eg: "ditto", "bulbasaur" )
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Pokémon not found");
                }
                const pokemonData = await res.json();
                console.log(pokemonData);

                if(isMounted) setData(pokemonData);
                
                //if we fetch from api make sure to save the information to the cache next time.
                localCache[selectedPokemon] = pokemonData;
                localStorage.setItem("pokedex", JSON.stringify(localCache))

            }
            catch(err){
                console.log(err.message);
            }finally{
                setLoading(false);
            }
        } 
        
        if(loading || !data){
            return <h4>Loading.....</h4>
        }

        fetchPokemonData();

        
        return () => { isMounted = false; }




    }, [selectedPokemon])
    


    return(
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>

            <div className="type-container">
                {
                    types?.map((typeObj, typeIndex)=>{
                        return(
                            <Typecard type={typeObj?.type?.name} key={typeIndex}/>
                        )
                    })

                }
            </div>
        </div>
    )
}
/**
 * This is a component for displaying a single pokemon type "i.e. Normal"
 */
import React from "react"
import { Link } from "gatsby"

function PokemonType({ pokemonType }) {
    
    const backgroundColor = pokemonType.color || `gray`

    const fullStyle = {
        display: `inline-block`,
        width: `100px`,
        margin: `5px`,
        padding: `3px`,
        fontFamily: `Chicago`,
        border: `2px solid gray`,
        borderRadius: `5px`,
        backgroundColor: backgroundColor,
        textDecoration: `none`,
        color: `white`,
        textShadow: `2px 2px #ff0000`
      }
    return (
        <Link style={fullStyle}>
            {pokemonType.id}
        </Link>
    )}

export default PokemonType
/**
 * This is a component for displaying a single pokemon type "i.e. Normal"
 */
import React from "react"
import { Link } from "gatsby"

function PokemonType({ pokemonType }) {
    
    const backgroundColor = pokemonType.color || `gray`

    const fullStyle = {
        display: `inline-block`,
        width: `90px`,
        height: `35px`,
        fontSize: `15px`,
        margin: `1px`,
        padding: `5px`,
        fontFamily: `Chicago`,
        border: `2px solid gray`,
        borderRadius: `4px`,
        backgroundColor: backgroundColor,
        textDecoration: `none`,
        color: `white`,
        textShadow: `1px 1px #ff0000`
      }
    return (
        <Link style={fullStyle}>
            {pokemonType.id}
        </Link>
    )}

export default PokemonType
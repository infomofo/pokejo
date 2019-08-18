/**
 * This is a component for displaying a single pokemon type "i.e. Normal"
 */
import React from "react"
import { Link } from "gatsby"
// import styled from "styled-components"


// const StyledType = styled.Link`

// `
function PokemonType({ pokemonType }) {
    
    const backgroundColor = pokemonType.frontmatter.color || `gray`

    const fullStyle = {
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
            {pokemonType.fields.truncated}
        </Link>
    )}

// const typeQuery = graphql`
// query TypeQueryByTruncated($slug: String!) {
//     markdownRemark(
//         fields: {
//           truncated: {eq: $slug}
//           path: {eq: "types"}
//         }) {
//         id
//         frontmatter {
//           title
//         }
//         fields {
//           slug
//           truncated
//         }
//       }
// `

export default PokemonType

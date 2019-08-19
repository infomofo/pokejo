import React from "react"
import { StaticQuery, graphql } from "gatsby"
import TypeByName from "../components/type-by-name"

import PropTypes from "prop-types"

function PokemonDetail({ name }) {
  return (
    <StaticQuery
      query={pokemonDetailQuery}
      render={(data) => {
        const allPokemon = data.allMarkdownRemark.edges
        const pokemon = allPokemon.find(({ node }) => {
          return node && node.fields && node.fields.truncated && node.fields.truncated === name
        })
        const types = pokemon && pokemon.node.frontmatter.type
        return pokemon ? (
          types.map((type) => {
            return (
              <TypeByName name={type}/>
            )
          }
        )) : name
      }}
    />
  )
}

PokemonDetail.propTypes = {
  name: PropTypes.string,
}

const pokemonDetailQuery = graphql`
  query PokemonDetailQuery {
    allMarkdownRemark(
      filter: { fields: { path: { eq: "pokemon"}} }
    ) {
      edges {
        node {
          fields {
            slug
            truncated
          }
          frontmatter {
            type
          }
        }
      }
    }
  }
`

export default PokemonDetail

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PokemonType from "../components/pokemon-type"

import PropTypes from "prop-types"

function PokemonDetail({ name }) {
  return (
    <StaticQuery
      query={pokemonDetailQuery}
      render={data => {
        const allPokemon = data.allMarkdownRemark.edges
        const pokemon = allPokemon.find(({ node }) => {
          return (
            node &&
            node.fields &&
            node.fields.truncated &&
            node.fields.truncated === name
          )
        })
        const types = pokemon && pokemon.node.frontmatter.type
        return pokemon ? (
          <div>
            {pokemon.node.frontmatter.image && (
              <img src={pokemon.node.frontmatter.image.publicURL} alt={pokemon.node.fields.truncated}></img>
            )}
            {types.map(type => {
              return <PokemonType pokemonType={type} />
            })}
          </div>
        ) : (
          name
        )
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
            type {
              id
              strong
              color
            }
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`

export default PokemonDetail

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import PokemonType from "./pokemon-type";

function TypeByName({ name }) {
  return (
    <StaticQuery
      query={typeByNameQuery}
      render={(data) => {
        const allTypes = data.allMarkdownRemark.edges
        const type = allTypes.find(({ node }) => {
          console.log(name)
          return node && node.fields && node.fields.truncated && node.fields.truncated === name
        })
        return type ? (
          <PokemonType pokemonType={type.node}/>
        ) : name
      }}
    />
  )
}

TypeByName.propTypes = {
  name: PropTypes.string,
}

const typeByNameQuery = graphql`
  query TypeByNameQuery {
    allMarkdownRemark(
      filter: { fields: { path: { eq: "types"}} }
    ) {
      edges {
        node {
          fields {
            slug
            truncated
          }
          frontmatter {
            strong
            color
          }
        }
      }
    }
  }
`

export default TypeByName

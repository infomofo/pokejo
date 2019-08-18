import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonType from "../components/pokemon-type"
import { graphql } from 'gatsby'

import ('../global.scss')
 
class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const types = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location}>
        <SEO
          title="Pokemon Journal"
          keywords={[`game`, `pokemon`, `javascript`, `react`]}
        />
        {types.map(({ node }) => {
          return (
            <PokemonType pokemonType={node}/>
          )
        })}
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___slug] }
      filter: { 
        fields: { 
          path: { eq: "types"}
        } 
      }
    ) {
      edges {
        node {
          fields {
            slug
            path
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
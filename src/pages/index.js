import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonType from "../components/pokemon-type"
import { graphql } from 'gatsby'
import styled from "styled-components"

import ('../global.scss')
 
const StyledTable = styled.table`
  max-width: 700px;
  margin: auto;
  th {
    max-width: 100px;
    text-align: center;
  }
`

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
        <StyledTable>
          <thead>
            <tr>
              <th>Type</th>
              <th>+</th>
            </tr>
          </thead>
          <tbody>
            {types.map(({ node }) => {
              return (
                <tr>
                  <th>
                    <PokemonType pokemonType={node} />
                  </th>
                </tr>
              )
            })}
          </tbody>
        </StyledTable>
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
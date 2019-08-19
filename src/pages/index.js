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
const PokemonSelector = styled.select`
  width: 100px;
`

class IndexPage extends React.Component {

  state = {
    party: new Array(6),
  }

  changePokemon(index, event) {
    let party = [...this.state.party]
    party[index] = event.target.value
    this.setState({
      party,
    });
  }

  render() {
    const { data } = this.props
    const types = data.types.edges.sort((a, b) => a > b)
    const pokemonList = data.pokemon.edges.sort((a, b) => a > b)

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
              {[...Array(6).keys()].map((index) => {
                return (
                  <th>
                    <label>
                      <PokemonSelector
                        value={this.state.party[index]}
                        onChange={e => this.changePokemon(index, e)}
                      >
                        <option default value="">Select</option>
                        {pokemonList.map(({ node }) => {
                          return (
                            <option value="node.fields.truncated">{node.fields.truncated}</option>
                          )
                        })}
                      </PokemonSelector>
                    </label>
                  </th>
                )
              })}
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
    types: allMarkdownRemark(
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
    pokemon: allMarkdownRemark(
      sort: { fields: [fields___slug] }
      filter: { 
        fields: { 
          path: { eq: "pokemon"}
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
            type
          }
        }
      }
    }
  }
`
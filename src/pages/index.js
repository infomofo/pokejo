import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PokemonType from "../components/pokemon-type"
import { graphql } from 'gatsby'
import styled from "styled-components"
import update from 'react-addons-update'

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

  state = {
    party: new Array(6),
  }

  changePokemon(index, event) {
    this.setState({
      party: update(this.state.party, event.target.value),
    });
  }

  render() {
    const { data } = this.props
    const types = data.allMarkdownRemark.edges.sort((a, b) => a > b)

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
                      <select
                        value={this.state.party[index]}
                        onChange={e => this.changePokemon(index, e)}
                      >
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="mango">Mango</option>
                      </select>
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
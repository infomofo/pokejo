import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"


class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const types = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location}>
        <SEO
          title="Food I Made"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {types.map(({ node }) => {
          const title = node.fields.truncated
          return (
            <div>{title}</div>
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
          }
        }
      }
    }
  }
`
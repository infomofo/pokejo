import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

class ChefPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const seoTitle=`${post.frontmatter.title} Recipes`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={seoTitle}
          description={post.excerpt}
          images={post.frontmatter.image && [post.frontmatter.image.childImageSharp.sizes.src]}
          />
        <h1>{seoTitle}</h1>
        {post.frontmatter.image &&
          <Img
            property="image"
            sizes={post.frontmatter.image.childImageSharp.sizes} />
        }
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <ul
          style={{
            marginTop: `10px`,
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={'/' + previous.fields.path + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={'/' + next.fields.path + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default ChefPostTemplate

export const pageQuery = graphql`
  query PokemonPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        type
      }
    }
  }
`

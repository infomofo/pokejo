const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const Promise = require(`bluebird`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise((resolve, reject) => {
    // Remove trailing slash
    const newPage = Object.assign({}, page, {
      path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
    })
    if (newPage.path !== page.path) {
      // Remove the old page
      deletePage(page)
      // Add the new page
      createPage(newPage)
    }

    resolve()
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const typeTemplate = path.resolve(`./src/templates/type-post.js`)
  const pokemonTemplate = path.resolve(`./src/templates/pokemon-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            fields: [fields___path]
            order: [DESC, DESC]
          }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                path
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      const slug = post.node.fields.slug
      const postTemplate =
        post.node.fields.path == "type"
          ? typeTemplate
          : pokemonTemplate

      createPage({
        path: "/" + post.node.fields.path + slug,
        component: postTemplate,
        context: {
          slug: slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, basePath: `types`, trailingSlash: false })
    // const truncated = slug.replace(/^\/+/, "")
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      name: `truncated`,
      node,
      value: value.substr(1)
    })
    createNodeField({
      name: `path`,
      node,
      value: getNode(node.parent).sourceInstanceName,
    })
  }
}

module.exports = {
  siteMetadata: {
    title: `Pokemon Journal`,
    description: `Plan the ultimate Pokemon Party`,
    author: `@infomofo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/types.yaml`,
        name: `types`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pokemon`,
        name: `pokemon`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          'gatsby-remark-static-images',
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  mapping: {
    "MarkdownRemark.frontmatter.type": `TypesYaml`,
  },
}

module.exports = {
  siteMetadata: {
    title: `Pokemon Journal`,
    description: `Plan the ultimate Pokemon Party`,
    author: `@infomofo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/types`,
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
    `gatsby-transformer-remark`,
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
}

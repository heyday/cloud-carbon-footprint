import React from 'react'
import Head from '@docusaurus/Head'

function MetaData() {
  return (
    <Head>
      <title>Cloud Carbon Footprint</title>
      <meta
        property="og:title"
        content="Cloud Carbon Footprint - An open source tool to measure and analyze cloud carbon emissions"
      ></meta>
      <meta property="og:type" content="website"></meta>
      <meta
        property="og:url"
        content="https://www.cloudcarbonfootprint.org/"
      ></meta>
      <meta
        property="og:description"
        content="An open source tool to measure and analyze cloud carbon emissions"
      ></meta>
      <meta
        property="og:image"
        content="https://www.cloudcarbonfootprint.org/img/social-share-image.png"
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content="Cloud Carbon Footprint - An open source tool to measure and analyze cloud carbon emissions"
      />
      <meta
        name="twitter:description"
        content="An open source tool to measure and analyze cloud carbon emissions"
      />
      <meta
        name="twitter:image"
        content="https://www.cloudcarbonfootprint.org/img/twtr-share-image.png"
      />
    </Head>
  )
}

export default MetaData
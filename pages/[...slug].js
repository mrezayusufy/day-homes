import { gql } from "@apollo/client"
import client from "client"
import { BlockRenderer } from "components/BlockRenderer"
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks"

export default function Page(props) {
  console.log('props', props)
  return <BlockRenderer blocks={props.blocks}/>
}
export const getStaticProps = async (context) => {
  console.log('context', context)
  const uri = `/${context.params.slug.join("/")}/`
  console.log('uri', uri)
  const { data } = await client.query({
    query: gql`
      query pageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks
            title
          }
        }
      }
    `,
    variables: {
      uri
    }
  })
  console.log('data', data)
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks);
  return {
    props: {
      title: data.nodeByUri.title,
      blocks: blocks,
    }
  }
}
export const getStaticPaths = async () => {

  const { data } = await client.query({
    query: gql`
    query AllPages {
      pages {
        nodes {
          uri
        }
      }
    }
    `
  });

  return {
    paths: data.pages.nodes.filter(page => page.uri !== "/").map(page => ({
      params: {
        slug: page.uri.substring(1, page.uri.length - 1).split('/'),
      }
    })),
    fallback: "blocking",
  }
}
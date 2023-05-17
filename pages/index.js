import { gql } from '@apollo/client';
import client from 'client'
import { BlockRenderer } from 'components/BlockRenderer';
import { cleanAndTransformBlocks } from 'utils/cleanAndTransformBlocks';

export default function Home(props) {
  console.log('props', props)
  return <div><BlockRenderer blocks={props.blocks}/></div>
}


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query nodeByUri {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks
          }
        }
      }
    `
  })
  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
    }
  }
}
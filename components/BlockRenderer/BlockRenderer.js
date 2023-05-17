import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { theme } from "utils/theme";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    console.log('block', block)
    switch (block.name) {
      case "core/paragraph": {
        return <Paragraph key={block.id} 
        textColor={theme[block.attributes.textColor] || blocks.attributes?.styles?.text?.color}
        content={block.attributes.content} 
        textAlign={block.attributes.align}/>;
      }
      case 'core/heading': {
        return <Heading key={block.id}
          textAlign={block.attributes.textAlign}
          level={block.attributes.level}
          content={block.attributes.content} />;
      }
      case 'core/cover': {
        return <Cover key={block.id} background={block.attributes.url}>
          <BlockRenderer blocks={block.innerBlocks} />
        </Cover>
      }
      default:
        return null;
    }
  })
}
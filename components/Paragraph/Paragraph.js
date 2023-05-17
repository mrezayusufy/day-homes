import { getTextAlign } from "utils/fonts"

export const Paragraph = ({content, textAlign, textColor}) =>{
  return <p dangerouslySetInnerHTML={{__html: content}} className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`} style={{color: textColor}} />
}
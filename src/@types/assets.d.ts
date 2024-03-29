declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
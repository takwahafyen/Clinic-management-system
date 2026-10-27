declare const process: {
  env: {
    NODE_ENV?: string;
    REACT_APP_API_URL?: string;
    [key: string]: string | undefined;
  };
};

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

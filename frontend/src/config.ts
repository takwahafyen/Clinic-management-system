declare const process: {
  env: {
    REACT_APP_API_URL?: string;
    NODE_ENV?: string;
    [key: string]: string | undefined;
  };
};

export const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

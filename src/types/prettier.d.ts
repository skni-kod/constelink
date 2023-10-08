declare module "prettier" {
  interface Config {
    importOrder?: string[];
    importOrderParserPlugins?: string[];
    importOrderTypeScriptVersion: "5.2.2";
    tailwindAttributes?: string[];
    tailwindConfig?: string;
    tailwindFunctions?: string[];
  }
}

export {};

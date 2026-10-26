// Each resource MDX file exports its own typed `metadata` alongside the default component.
declare module "*.mdx" {
  export const metadata: import("@/content/types").ResourceMeta;
}

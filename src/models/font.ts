export type FontType = {
  kind: string
  family: string
  category: string
  variants: Array<string>
  subsets: Array<string>
  version: string
  lastModified: string
  files: Record<string, string>
}

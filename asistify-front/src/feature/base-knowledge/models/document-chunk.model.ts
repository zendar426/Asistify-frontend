export class DocumentChunkModel {
  constructor(
    public readonly id: string,
    public readonly index: number,
    public readonly content: string,
    public readonly keywords: string[],
    public readonly sectionTitle: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly metadata: Record<string, any>,
    public readonly createdAt: string,
    public readonly enterpriseId: string,
    public readonly documentId: string,
  ) {}

  get contentLength(): number {
    return this.content.length
  }

  get keywordsCount(): number {
    return this.keywords.length
  }
}

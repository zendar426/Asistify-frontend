import type { DocumentChunkModel } from './document-chunk.model'

export class Document {
    constructor(
        public readonly id: string,
        public readonly original_name: string,
        public readonly chunkCount: number,
        public readonly extension_content: string,
        public readonly size: string,
        public readonly file_path: string,
        public readonly name: string,
        public readonly documentTypeId: string,
        public readonly enterprise_id: string,
        public readonly created_at: string,
        public readonly updated_at: string,
        public readonly chunks: DocumentChunkModel[] = [],
    ) {}

    get chunksCount(): number {
        return this.chunks.length
    }

    get hasChunks(): boolean {
        return this.chunks.length > 0
    }
}

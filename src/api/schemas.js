import { z } from "zod";

export const HealthResponseSchema = z.object({
  status: z.string(),
});

export const FeedbackBodySchema = z.object({
  trace_id: z.string().min(1),
  useful: z.boolean(),
  comment: z.string().nullable().optional(),
});

export const PaperInfoSchema = z
  .object({
    title: z.string().min(10),
    abstract: z.string().min(200),
    authors: z.array(z.string()).min(1),
    url: z.string().url(),
    open_access: z.boolean(),
    doi: z.string().nullable(),
    pdf_url: z.string().url().nullable(),
    publication_year: z.number().int().nullable(),
    citation_count: z.number().int().nullable(),
  })
  .transform((paper) => ({
    title: paper.title,
    abstract: paper.abstract,
    authors: paper.authors,
    url: paper.url,
    isOpenAccess: paper.open_access,
    doi: paper.doi,
    pdfUrl: paper.pdf_url,
    publicationYear: paper.publication_year,
    citationCount: paper.citation_count,
  }));

export const SearchResponseSchema = z
  .object({
    papers: z.array(PaperInfoSchema),
    suggestion: z.string(),
    trace_id: z.string(),
  })
  .transform(({ papers, suggestion, trace_id }) => ({
    papers,
    suggestion,
    traceId: trace_id,
  }));

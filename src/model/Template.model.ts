export interface Template {
  body: string;
  created_by: number;
  id: number;
  slug: string;
  summary: string;
  title: string;
}

export type LandingTemplate = Pick<Template, 'summary' | 'body' | 'title'>;

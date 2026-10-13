import { NextResponse } from 'next/server';
import { publishedProjects } from '@/lib/projects';
export const dynamic = 'force-static';
export function GET() {
  return NextResponse.json({
    items: publishedProjects.map(({ id, slug, title, subtitle, category, style, cover }) => ({
      id,
      slug,
      title,
      subtitle,
      category,
      style,
      cover,
    })),
  });
}

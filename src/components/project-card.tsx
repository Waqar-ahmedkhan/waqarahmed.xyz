"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  isMobile: boolean;
}

export function ProjectCard({ title, description, tags, link }: Props) {
  return (
    <Card className="flex flex-col h-[200px] sm:h-[220px] border border-border p-4 hover:border-gray-700 transition-all duration-300">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm sm:text-base font-semibold text-foreground">
          {link ? (
            <a
              href={link}
              target="_blank"
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200"
            >
              {title}
              <span className="h-1 w-1 rounded-full bg-green-500"></span>
            </a>
          ) : (
            title
          )}
        </CardTitle>
        <div className="hidden font-mono text-xs text-muted-foreground print:visible">
          {link?.replace("https://", "").replace("www.", "").replace("/", "")}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px] sm:text-xs print:text-[8px]"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
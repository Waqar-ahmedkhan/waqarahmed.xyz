import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
  const isExternalLink = link?.startsWith("http");

  return (
    <Card className="flex min-h-[230px] flex-col border border-border/80 p-4 transition-colors duration-300 hover:border-foreground/15">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm sm:text-base font-semibold leading-6 text-foreground">
          {link ? (
            <a
              href={link}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
              className="inline-flex min-w-0 items-center gap-1.5 underline-offset-4 hover:text-foreground hover:underline transition-colors duration-200"
            >
              <span className="line-clamp-2">{title}</span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
            </a>
          ) : (
            <span className="line-clamp-2">{title}</span>
          )}
        </CardTitle>
        <div className="hidden font-mono text-xs text-muted-foreground print:visible">
          {link?.replace("https://", "").replace("www.", "").replace("/", "")}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0">
        <p className="text-xs leading-6 sm:text-sm sm:leading-6 text-muted-foreground line-clamp-3">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1 pt-3">
          {tags.map((tag) => (
            <Badge
              className="px-1.5 py-0 text-[10px] sm:text-xs print:text-[8px]"
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

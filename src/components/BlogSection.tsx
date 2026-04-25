"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ArrowRightIcon } from "lucide-react";

interface BlogProject {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  link?: string;
}

interface BlogSectionProps {
  blogProjects: BlogProject[];
  generateExcerpt: (text: string, maxLength?: number) => string;
  animationDelay?: string;
}

export function BlogSection({
  blogProjects,
  generateExcerpt,
  animationDelay = "0.7s",
}: BlogSectionProps) {
  return (
    <Section
      className="my-6 sm:my-8 md:my-10 animate-fade-in"
      style={{ animationDelay }}
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground animate-fade-in-subtle">
        Blog
      </h2>
      <div className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
        {blogProjects.length > 0
          ? "Explore my latest insights and articles:"
          : "Blog posts are in progress. Visit my Medium profile for updates."}
      </div>
      {blogProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
          {blogProjects.map((post, index) => {
            const isInternalLink = post.link?.startsWith("/");

            return (
              <Card
                key={post.title}
                className="p-4 sm:p-5 border border-border hover:border-gray-700 transition-all duration-300"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader className="p-0 pb-2 sm:pb-3">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground">
                    {post.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Article | 2026
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                    {generateExcerpt(post.description)}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tech_stack
                      .filter((tag) => tag !== "Blog" && tag !== "Medium")
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  {post.link && (
                    <Button
                      variant="link"
                      asChild
                      className="p-0 h-auto text-xs sm:text-sm text-blue-400 hover:text-blue-500 transition-colors duration-200 mt-2"
                      aria-label={`Read more about ${post.title}`}
                    >
                      <a
                        href={post.link}
                        target={isInternalLink ? undefined : "_blank"}
                        rel={isInternalLink ? undefined : "noopener noreferrer"}
                      >
                        Read More
                        <ArrowRightIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Button
          variant="link"
          asChild
          className="p-0 h-auto text-xs sm:text-sm text-blue-400 hover:text-blue-500 transition-colors duration-200 mt-2"
          aria-label="Visit Medium profile"
        >
          <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
            Visit Medium Profile
            <ArrowRightIcon className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </Button>
      )}
    </Section>
  );
}

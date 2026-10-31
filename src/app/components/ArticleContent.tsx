function splitIntoParagraphs(content: string): string[] {
  // 1. Normal case: editor pressed Enter between paragraphs
  const byLine = content
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (byLine.length > 1 || content.length < 500) return byLine;

  // 2. Fallback for old articles saved as one big block:
  //    group every 3 sentences into a paragraph
  const sentences = content.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [
    content,
  ];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    chunks.push(
      sentences
        .slice(i, i + 3)
        .join("")
        .trim(),
    );
  }
  return chunks;
}

export default function ArticleContent({ content }: { content: string }) {
  if (!content) return null;

  const paragraphs = splitIntoParagraphs(content);

  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "text-lg md:text-xl leading-8 text-gray-900 font-medium"
              : "text-base md:text-lg leading-8 text-gray-700"
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

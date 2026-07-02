type LegalBlock =
  | { type: "p"; text: string; emphasis?: boolean }
  | { type: "ul"; items: string[] }
  | { type: "subheading"; text: string }
  | { type: "address"; lines: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

function Bullet({ text }: { text: string }) {
  const dashIndex = text.indexOf(" — ");
  const label = dashIndex === -1 ? null : text.slice(0, dashIndex);
  const rest = dashIndex === -1 ? text : text.slice(dashIndex);

  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mauve" />
      <span>
        {label && <strong className="font-medium text-ink">{label}</strong>}
        {rest}
      </span>
    </li>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p
        className={
          block.emphasis
            ? "font-medium text-ink"
            : "font-light text-ink/80"
        }
      >
        {block.text}
      </p>
    );
  }

  if (block.type === "subheading") {
    return (
      <p className="font-medium text-ink">{block.text}</p>
    );
  }

  if (block.type === "address") {
    return (
      <p className="font-light text-ink/80">
        {block.lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    );
  }

  return (
    <ul className="space-y-2 font-light text-ink/80">
      {block.items.map((item) => (
        <Bullet key={item} text={item} />
      ))}
    </ul>
  );
}

export function LegalDocument({
  title,
  effectiveDate,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  intro: LegalBlock[];
  sections: LegalSection[];
}) {
  return (
    <main className="flex flex-1 flex-col px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm font-light text-ink/60">
          Effective Date: {effectiveDate} · Last Updated: {lastUpdated}
        </p>

        <div className="mt-8 space-y-4 leading-7">
          {intro.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl font-extrabold text-ink">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 leading-7">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Reveal, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { careers } from "@/data/careers";
import { certificates } from "@/data/certificates";
import { educations } from "@/data/education";
import { experiences } from "@/data/experiences";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { formatPeriod } from "@/data/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for `getTranslations` to work during static rendering.
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-24 md:px-10">
      {/* ① Intro */}
      <section
        id="intro"
        aria-labelledby="intro-heading"
        className="flex min-h-[70svh] flex-col justify-center py-16 md:py-24"
      >
        <Reveal stagger>
          <RevealItem as="p" className="text-caption font-medium text-primary">
            {t("intro.eyebrow")}
          </RevealItem>
          <RevealItem as="div" className="mt-3">
            <h1
              id="intro-heading"
              className="text-display font-bold tracking-tight text-foreground"
            >
              {profile.name[locale]}
            </h1>
            <p className="text-h2 mt-2 font-semibold text-muted-foreground">
              {profile.headline[locale]}
            </p>
          </RevealItem>
          <RevealItem
            as="p"
            className="text-body mt-8 max-w-2xl text-muted-foreground"
          >
            {profile.bio[locale]}
          </RevealItem>
          <RevealItem as="div" className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="text-body inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] motion-reduce:transform-none"
            >
              {t("intro.cta")}
            </Link>
            {profile.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-body inline-flex items-center rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </RevealItem>
        </Reveal>
      </section>

      {/* ② Skills */}
      <Section id="skills" title={t("skills.title")}>
        <Reveal stagger className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <RevealItem
              key={category.id}
              className="rounded-2xl bg-surface p-6"
            >
              <h3 className="text-h3 font-semibold text-foreground">
                {category.label[locale]}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-caption rounded-full bg-primary-tint px-3 py-1 font-medium text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* ③ Career */}
      <Section id="career" title={t("career.title")}>
        <Reveal stagger as="ol" className="flex flex-col gap-8">
          {careers.map((career) => (
            <RevealItem
              key={career.id}
              as="li"
              className="border-l-2 border-border pl-6"
            >
              <p className="text-caption font-medium text-muted-foreground">
                {formatPeriod(career.period, locale)}
              </p>
              <h3 className="text-h2 mt-1 font-semibold text-foreground">
                {career.company[locale]}
              </h3>
              <p className="text-body mt-1 font-medium text-primary">
                {career.role[locale]}
              </p>
              <ul className="text-body mt-4 flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
                {career.highlights[locale].map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {career.projectSlug ? (
                <Link
                  href={`/projects/${career.projectSlug}`}
                  className="text-caption mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  {t("career.viewProject")}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* ④ Education */}
      <Section id="education" title={t("education.title")}>
        <Reveal stagger as="ul" className="flex flex-col gap-6">
          {educations.map((education) => (
            <RevealItem
              key={education.id}
              as="li"
              className="rounded-2xl bg-surface p-6"
            >
              <p className="text-caption font-medium text-muted-foreground">
                {formatPeriod(education.period, locale)}
              </p>
              <h3 className="text-h3 mt-1 font-semibold text-foreground">
                {education.school[locale]}
              </h3>
              <p className="text-body mt-1 text-muted-foreground">
                {education.major[locale]}
                {education.degree ? ` · ${education.degree[locale]}` : ""}
              </p>
              {education.note ? (
                <p className="text-caption mt-3 text-muted-foreground">
                  {education.note[locale]}
                </p>
              ) : null}
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* ⑤ Certificates */}
      <Section id="certificates" title={t("certificates.title")}>
        <Reveal stagger as="ul" className="flex flex-col gap-4">
          {certificates.map((certificate) => (
            <RevealItem
              key={certificate.id}
              as="li"
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-surface px-6 py-4"
            >
              <div>
                <h3 className="text-h3 font-semibold text-foreground">
                  {certificate.credentialUrl ? (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {certificate.name[locale]}
                    </a>
                  ) : (
                    certificate.name[locale]
                  )}
                </h3>
                <p className="text-caption mt-1 text-muted-foreground">
                  {certificate.issuer[locale]}
                </p>
              </div>
              <p className="text-caption font-medium text-muted-foreground">
                {certificate.issuedAt.replace("-", ".")}
              </p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      {/* ⑥ Experience */}
      <Section id="experience" title={t("experience.title")}>
        <Reveal stagger as="ul" className="flex flex-col gap-6">
          {experiences.map((experience) => (
            <RevealItem
              key={experience.id}
              as="li"
              className="rounded-2xl bg-surface p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-caption rounded-full bg-primary-tint px-3 py-1 font-medium text-primary">
                  {t(`experience.types.${experience.type}`)}
                </span>
                <span className="text-caption font-medium text-muted-foreground">
                  {formatPeriod(experience.period, locale)}
                </span>
              </div>
              <h3 className="text-h3 mt-3 font-semibold text-foreground">
                {experience.link ? (
                  <a
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {experience.title[locale]}
                  </a>
                ) : (
                  experience.title[locale]
                )}
              </h3>
              <p className="text-caption mt-1 text-muted-foreground">
                {experience.organization[locale]}
              </p>
              {experience.description ? (
                <p className="text-body mt-3 text-muted-foreground">
                  {experience.description[locale]}
                </p>
              ) : null}
            </RevealItem>
          ))}
        </Reveal>
      </Section>
    </div>
  );
}

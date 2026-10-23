'use client';

import { Portfolio, PortfolioSection, Template, TemplateStyles } from '@/types';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ExternalLink,
  Calendar,
  Building,
  Award,
  Star,
} from 'lucide-react';

interface PortfolioRendererProps {
  portfolio: Portfolio & { sections: PortfolioSection[] };
}

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ExternalLink,
  Calendar,
  Building,
  Award,
  Star,
};

export default function PortfolioRenderer({ portfolio }: PortfolioRendererProps) {
  const templateStyles = (portfolio.template_styles as TemplateStyles) || {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      background: '#ffffff',
      text: '#1e293b',
      accent: '#f59e0b',
    },
    fonts: { heading: 'Inter', body: 'Inter' },
    spacing: 'normal',
    border_radius: 'md',
  };

  const colors = templateStyles.colors;
  const spacing = templateStyles.spacing;
  const borderRadius = templateStyles.borderRadius;

  const spacingClasses = {
    compact: 'py-8',
    normal: 'py-16',
    relaxed: 'py-24',
  };

  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const containerStyle: React.CSSProperties = {
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-background': colors.background,
    '--color-text': colors.text,
    '--color-accent': colors.accent,
    '--font-heading': templateStyles.fonts.heading,
    '--font-body': templateStyles.fonts.body,
  };

  const renderSection = (section: PortfolioSection) => {
    const content = section.content || {};
    const SectionIcon = sectionIcons[section.type] || Globe;

    switch (section.type) {
      case 'hero':
        return (
          <section
            id="hero"
            className={cn(spacingClasses[spacing], 'relative')}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4 text-center">
              {content.avatar_url && (
                <img
                  src={content.avatar_url}
                  alt={content.name || 'Profile'}
                  className={cn(
                    'mx-auto mb-6 h-24 w-24',
                    radiusClasses[borderRadius] === 'rounded-full'
                      ? 'rounded-full'
                      : radiusClasses[borderRadius]
                  )}
                  style={{ border: `3px solid ${colors.primary}` }}
                />
              )}
              <h1
                className="mb-4 text-4xl font-bold md:text-6xl"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {content.name || portfolio.title}
              </h1>
              {content.headline && (
                <h2
                  className="mb-4 text-xl md:text-2xl"
                  style={{ color: colors.secondary, fontFamily: templateStyles.fonts.body }}
                >
                  {content.headline}
                </h2>
              )}
              {content.subheadline && (
                <p
                  className="mx-auto mb-8 max-w-2xl text-lg"
                  style={{ color: colors.text, fontFamily: templateStyles.fonts.body }}
                >
                  {content.subheadline}
                </p>
              )}
              {content.cta_text && content.cta_link && (
                <a
                  href={content.cta_link}
                  className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium"
                  style={{
                    backgroundColor: colors.primary,
                    color: '#fff',
                    borderRadius: radiusClasses[borderRadius],
                  }}
                >
                  {content.cta_text}
                </a>
              )}
            </div>
          </section>
        );

      case 'about':
        return (
          <section
            id="about"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="mb-8 text-center text-3xl font-bold"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {section.title}
              </h2>
              <div className="mx-auto max-w-3xl">
                {content.description && (
                  <div
                    className="prose mb-8"
                    style={{ color: colors.text, fontFamily: templateStyles.fonts.body }}
                  >
                    {content.description.split('\n').map((para: string, i: number) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
                {content.highlights && content.highlights.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {content.highlights.map((highlight: string, i: number) => (
                      <div
                        key={i}
                        className="border-l-4 p-4"
                        style={{
                          borderColor: colors.primary,
                          backgroundColor: colors.primary + '10',
                          borderRadius: radiusClasses[borderRadius],
                        }}
                      >
                        <p style={{ fontFamily: templateStyles.fonts.body }}>{highlight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section
            id="skills"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="mb-8 text-center text-3xl font-bold"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {section.title}
              </h2>
              <div className="space-y-8">
                {content.categories?.map((category: any, catIndex: number) => (
                  <div key={catIndex}>
                    <h3
                      className="mb-4 text-xl font-semibold"
                      style={{ color: colors.text, fontFamily: templateStyles.fonts.heading }}
                    >
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {category.skills?.map((skill: any, skillIndex: number) => (
                        <div key={skillIndex} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span style={{ fontFamily: templateStyles.fonts.body }}>
                              {skill.name}
                            </span>
                            <span style={{ color: colors.secondary }}>{skill.level}/5</span>
                          </div>
                          <div
                            className="h-2 bg-muted"
                            style={{ borderRadius: radiusClasses[borderRadius] }}
                          >
                            <div
                              className="h-full"
                              style={{
                                width: `${(skill.level / 5) * 100}%`,
                                backgroundColor: colors.primary,
                                borderRadius: radiusClasses[borderRadius],
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section
            id="projects"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="mb-8 text-center text-3xl font-bold"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {section.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {content.projects?.map((project: any, index: number) => (
                  <article
                    key={index}
                    className="group"
                    style={{ borderRadius: radiusClasses[borderRadius] }}
                  >
                    {project.image_url && (
                      <div
                        className="mb-4 overflow-hidden"
                        style={{ borderRadius: radiusClasses[borderRadius] }}
                      >
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3
                      className="mb-2 text-xl font-bold"
                      style={{ color: colors.text, fontFamily: templateStyles.fonts.heading }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mb-3 text-sm"
                      style={{ color: colors.secondary, fontFamily: templateStyles.fonts.body }}
                    >
                      {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: colors.primary + '15',
                              color: colors.primary,
                              borderRadius: radiusClasses[borderRadius],
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium"
                          style={{ color: colors.primary }}
                        >
                          Demo <ExternalLink className="ml-1 inline h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium"
                          style={{ color: colors.primary }}
                        >
                          Code <Github className="ml-1 inline h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      case 'experience':
        return (
          <section
            id="experience"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="mb-8 text-center text-3xl font-bold"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {section.title}
              </h2>
              <div className="mx-auto max-w-2xl space-y-8">
                {content.experiences?.map((exp: any, index: number) => (
                  <div
                    key={index}
                    className="relative border-l-2 pl-6"
                    style={{ borderColor: colors.primary + '30' }}
                  >
                    <div
                      className="absolute left-0 top-1 h-4 w-4 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text, fontFamily: templateStyles.fonts.heading }}
                      >
                        {exp.role}
                      </h3>
                      <span
                        className="text-sm"
                        style={{ color: colors.secondary, fontFamily: templateStyles.fonts.body }}
                      >
                        {formatDate(exp.start_date)} -{' '}
                        {exp.current ? 'Present' : formatDate(exp.end_date || '')}
                      </span>
                    </div>
                    <p
                      className="mb-1 font-medium"
                      style={{ color: colors.primary, fontFamily: templateStyles.fonts.body }}
                    >
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </p>
                    {exp.description && (
                      <p
                        className="mb-3"
                        style={{ color: colors.text, fontFamily: templateStyles.fonts.body }}
                      >
                        {exp.description}
                      </p>
                    )}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs"
                            style={{
                              backgroundColor: colors.primary + '10',
                              color: colors.primary,
                              borderRadius: radiusClasses[borderRadius],
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'education':
        return (
          <section
            id="education"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="mb-8 text-center text-3xl font-bold"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {section.title}
              </h2>
              <div className="mx-auto max-w-2xl space-y-6">
                {content.education?.map((edu: any, index: number) => (
                  <div
                    key={index}
                    className="border p-6"
                    style={{
                      borderColor: colors.primary + '20',
                      borderRadius: radiusClasses[borderRadius],
                    }}
                  >
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.text, fontFamily: templateStyles.fonts.heading }}
                      >
                        {edu.degree} in {edu.field_of_study}
                      </h3>
                      <span
                        className="text-sm"
                        style={{ color: colors.secondary, fontFamily: templateStyles.fonts.body }}
                      >
                        {formatDate(edu.start_date)} -{' '}
                        {edu.current ? 'Present' : formatDate(edu.end_date || '')}
                      </span>
                    </div>
                    <p
                      className="mb-2 font-medium"
                      style={{ color: colors.primary, fontFamily: templateStyles.fonts.body }}
                    >
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p style={{ color: colors.text, fontFamily: templateStyles.fonts.body }}>
                        {edu.description}
                      </p>
                    )}
                    {edu.grade && (
                      <p
                        className="mt-2 text-sm"
                        style={{ color: colors.secondary, fontFamily: templateStyles.fonts.body }}
                      >
                        Grade: {edu.grade}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section
            id="contact"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="mb-8 text-center text-3xl font-bold"
                style={{ fontFamily: templateStyles.fonts.heading, color: colors.text }}
              >
                {section.title}
              </h2>
              <div className="mx-auto max-w-xl space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {content.email && (
                    <a
                      href={`mailto:${content.email}`}
                      className="flex items-center gap-3 border p-4"
                      style={{
                        borderColor: colors.primary + '30',
                        borderRadius: radiusClasses[borderRadius],
                        color: colors.text,
                      }}
                    >
                      <Mail className="h-5 w-5" style={{ color: colors.primary }} />
                      <span style={{ fontFamily: templateStyles.fonts.body }}>{content.email}</span>
                    </a>
                  )}
                  {content.phone && (
                    <a
                      href={`tel:${content.phone}`}
                      className="flex items-center gap-3 border p-4"
                      style={{
                        borderColor: colors.primary + '30',
                        borderRadius: radiusClasses[borderRadius],
                        color: colors.text,
                      }}
                    >
                      <Phone className="h-5 w-5" style={{ color: colors.primary }} />
                      <span style={{ fontFamily: templateStyles.fonts.body }}>{content.phone}</span>
                    </a>
                  )}
                  {content.location && (
                    <div
                      className="flex items-center gap-3 border p-4"
                      style={{
                        borderColor: colors.primary + '30',
                        borderRadius: radiusClasses[borderRadius],
                        color: colors.text,
                      }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: colors.primary }} />
                      <span style={{ fontFamily: templateStyles.fonts.body }}>
                        {content.location}
                      </span>
                    </div>
                  )}
                </div>
                {content.social_links && content.social_links.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {content.social_links.map((social: any, i: number) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border p-3"
                        style={{
                          borderColor: colors.primary + '30',
                          borderRadius: radiusClasses[borderRadius],
                          color: colors.primary,
                        }}
                      >
                        {social.icon &&
                          sectionIcons[social.icon] &&
                          (() => {
                            const Icon = sectionIcons[social.icon];
                            return <Icon className="h-5 w-5" />;
                          })()}
                        {social.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'custom':
        return (
          <section
            id="custom"
            className={cn(spacingClasses[spacing])}
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <div
              className="container mx-auto px-4"
              dangerouslySetInnerHTML={{ __html: content.custom_html || '' }}
            />
            <style dangerouslySetInnerHTML={{ __html: content.custom_css || '' }} />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        ...containerStyle,
        fontFamily: templateStyles.fonts.body,
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {portfolio.sections
        .filter((s) => s.is_visible)
        .sort((a, b) => a.order - b.order)
        .map(renderSection)}

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{
          backgroundColor: colors.primary + '05',
          borderTop: `1px solid ${colors.primary}20`,
          color: colors.secondary,
        }}
      >
        <p style={{ fontFamily: templateStyles.fonts.body }}>
          © {new Date().getFullYear()} {portfolio.title}. Built with Portfolio Builder.
        </p>
      </footer>
    </div>
  );
}

-- Insert default templates
INSERT INTO public.templates (id, name, description, thumbnail_url, preview_url, sections, styles) VALUES
(
  'modern',
  'Modern',
  'Clean and minimal design with focus on content',
  '/templates/modern-thumb.png',
  '/templates/modern-preview.html',
  '[
    {"type": "hero", "title": "Hero", "default_content": {"name": "", "headline": "", "subheadline": "", "cta_text": "Get In Touch", "cta_link": "#contact"}, "order": 0, "required": true},
    {"type": "about", "title": "About Me", "default_content": {"description": "", "highlights": []}, "order": 1, "required": false},
    {"type": "skills", "title": "Skills", "default_content": {"categories": []}, "order": 2, "required": false},
    {"type": "projects", "title": "Projects", "default_content": {"projects": []}, "order": 3, "required": false},
    {"type": "experience", "title": "Experience", "default_content": {"experiences": []}, "order": 4, "required": false},
    {"type": "education", "title": "Education", "default_content": {"education": []}, "order": 5, "required": false},
    {"type": "contact", "title": "Contact", "default_content": {"email": "", "phone": "", "location": "", "social_links": []}, "order": 6, "required": false}
  ]'::jsonb,
  '{
    "colors": {"primary": "#2563eb", "secondary": "#64748b", "background": "#ffffff", "text": "#1e293b", "accent": "#f59e0b"},
    "fonts": {"heading": "Inter", "body": "Inter"},
    "spacing": "normal",
    "border_radius": "md"
  }'::jsonb
),
(
  'creative',
  'Creative',
  'Bold and expressive design for creative professionals',
  '/templates/creative-thumb.png',
  '/templates/creative-preview.html',
  '[
    {"type": "hero", "title": "Hero", "default_content": {"name": "", "headline": "", "subheadline": "", "cta_text": "View Work", "cta_link": "#projects"}, "order": 0, "required": true},
    {"type": "about", "title": "My Story", "default_content": {"description": "", "highlights": []}, "order": 1, "required": false},
    {"type": "projects", "title": "Featured Work", "default_content": {"projects": []}, "order": 2, "required": false},
    {"type": "skills", "title": "Tools & Skills", "default_content": {"categories": []}, "order": 3, "required": false},
    {"type": "experience", "title": "Journey", "default_content": {"experiences": []}, "order": 4, "required": false},
    {"type": "contact", "title": "Let's Connect", "default_content": {"email": "", "phone": "", "location": "", "social_links": []}, "order": 5, "required": false}
  ]'::jsonb,
  '{
    "colors": {"primary": "#7c3aed", "secondary": "#a855f7", "background": "#fafafa", "text": "#18181b", "accent": "#f97316"},
    "fonts": {"heading": "Playfair Display", "body": "DM Sans"},
    "spacing": "relaxed",
    "border_radius": "full"
  }'::jsonb
),
(
  'minimal',
  'Minimal',
  'Ultra-clean design with maximum whitespace',
  '/templates/minimal-thumb.png',
  '/templates/minimal-preview.html',
  '[
    {"type": "hero", "title": "Hero", "default_content": {"name": "", "headline": "", "subheadline": "", "cta_text": "Contact", "cta_link": "#contact"}, "order": 0, "required": true},
    {"type": "about", "title": "About", "default_content": {"description": "", "highlights": []}, "order": 1, "required": false},
    {"type": "experience", "title": "Experience", "default_content": {"experiences": []}, "order": 2, "required": false},
    {"type": "projects", "title": "Work", "default_content": {"projects": []}, "order": 3, "required": false},
    {"type": "skills", "title": "Skills", "default_content": {"categories": []}, "order": 4, "required": false},
    {"type": "contact", "title": "Contact", "default_content": {"email": "", "phone": "", "location": "", "social_links": []}, "order": 5, "required": false}
  ]'::jsonb,
  '{
    "colors": {"primary": "#18181b", "secondary": "#71717a", "background": "#ffffff", "text": "#18181b", "accent": "#18181b"},
    "fonts": {"heading": "Space Grotesk", "body": "Space Grotesk"},
    "spacing": "relaxed",
    "border_radius": "none"
  }'::jsonb
),
(
  'developer',
  'Developer',
  'Technical-focused design with code highlighting',
  '/templates/developer-thumb.png',
  '/templates/developer-preview.html',
  '[
    {"type": "hero", "title": "Hero", "default_content": {"name": "", "headline": "", "subheadline": "", "cta_text": "View GitHub", "cta_link": "#projects"}, "order": 0, "required": true},
    {"type": "about", "title": "About", "default_content": {"description": "", "highlights": []}, "order": 1, "required": false},
    {"type": "skills", "title": "Tech Stack", "default_content": {"categories": []}, "order": 2, "required": false},
    {"type": "projects", "title": "Projects", "default_content": {"projects": []}, "order": 3, "required": false},
    {"type": "experience", "title": "Experience", "default_content": {"experiences": []}, "order": 4, "required": false},
    {"type": "education", "title": "Education", "default_content": {"education": []}, "order": 5, "required": false},
    {"type": "contact", "title": "Connect", "default_content": {"email": "", "phone": "", "location": "", "social_links": []}, "order": 6, "required": false}
  ]'::jsonb,
  '{
    "colors": {"primary": "#059669", "secondary": "#6b7280", "background": "#0f172a", "text": "#f1f5f9", "accent": "#22d3ee"},
    "fonts": {"heading": "JetBrains Mono", "body": "IBM Plex Sans"},
    "spacing": "normal",
    "border_radius": "sm"
  }'::jsonb
),
(
  'executive',
  'Executive',
  'Professional design for senior leaders and executives',
  '/templates/executive-thumb.png',
  '/templates/executive-preview.html',
  '[
    {"type": "hero", "title": "Executive Summary", "default_content": {"name": "", "headline": "", "subheadline": "", "cta_text": "Contact Me", "cta_link": "#contact"}, "order": 0, "required": true},
    {"type": "about", "title": "Leadership Philosophy", "default_content": {"description": "", "highlights": []}, "order": 1, "required": false},
    {"type": "experience", "title": "Executive Experience", "default_content": {"experiences": []}, "order": 2, "required": false},
    {"type": "skills", "title": "Core Competencies", "default_content": {"categories": []}, "order": 3, "required": false},
    {"type": "education", "title": "Education & Certifications", "default_content": {"education": []}, "order": 4, "required": false},
    {"type": "contact", "title": "Get In Touch", "default_content": {"email": "", "phone": "", "location": "", "social_links": []}, "order": 5, "required": false}
  ]'::jsonb,
  '{
    "colors": {"primary": "#1e3a8a", "secondary": "#475569", "background": "#ffffff", "text": "#0f172a", "accent": "#c4b5fd"},
    "fonts": {"heading": "Merriweather", "body": "Source Sans Pro"},
    "spacing": "normal",
    "border_radius": "md"
  }'::jsonb
);
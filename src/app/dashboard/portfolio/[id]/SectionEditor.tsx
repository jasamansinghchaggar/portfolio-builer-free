'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  GripVertical,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Save,
  Loader2,
  X,
  LayoutDashboard,
  User,
  Code,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
} from 'lucide-react';
import { PortfolioSection, SectionType, SectionContent } from '@/types';
import { cn } from '@/lib/utils';

interface SectionEditorProps {
  section: PortfolioSection;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<PortfolioSection>) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: () => void;
}

const sectionTypeIcons: Record<SectionType, React.ComponentType<{ className?: string }>> = {
  hero: LayoutDashboard,
  about: User,
  skills: Code,
  projects: FolderOpen,
  experience: Briefcase,
  education: GraduationCap,
  contact: Mail,
  custom: FileText,
};

const sectionTypeLabels: Record<SectionType, string> = {
  hero: 'Hero',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  education: 'Education',
  contact: 'Contact',
  custom: 'Custom',
};

export function SectionEditor({
  section,
  index,
  isEditing,
  onEdit,
  onClose,
  onUpdate,
  onDelete,
  onToggleVisibility,
}: SectionEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<SectionContent>(section.content || {});
  const Icon = sectionTypeIcons[section.type] || FileText;

  const handleSave = async () => {
    setIsSaving(true);
    onUpdate(section.id, { content: formData, title: formData.name || section.title });
    setIsSaving(false);
    onClose();
  };

  if (!isEditing) {
    return (
      <div className="group relative">
        <div className="flex items-start gap-3 p-4">
          <GripVertical className="mt-1 h-5 w-5 cursor-grab text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="truncate font-medium">
                  {section.title || sectionTypeLabels[section.type]}
                </p>
                <p className="text-sm capitalize text-muted-foreground">{section.type}</p>
              </div>
              {section.is_visible && (
                <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Visible
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onToggleVisibility} className="h-8 w-8">
              {section.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(section.id)}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator />
      </div>
    );
  }

  return (
    <div className="border-b border-t bg-muted/30">
      <div className="flex items-center gap-3 border-b p-4">
        <GripVertical className="mt-1 h-5 w-5 cursor-grab text-muted-foreground" />
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <Input
            value={formData.name || section.title || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Section title"
            className="font-medium"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Section-specific fields */}
          {renderSectionFields(section.type, formData, setFormData)}

          <Separator />

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

function renderSectionFields(
  type: SectionType,
  data: SectionContent,
  setData: React.Dispatch<React.SetStateAction<SectionContent>>
) {
  const updateField = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  switch (type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={data.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <Label>Headline</Label>
            <Input
              value={data.headline || ''}
              onChange={(e) => updateField('headline', e.target.value)}
              placeholder="Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label>Sub-headline</Label>
            <Textarea
              value={data.subheadline || ''}
              onChange={(e) => updateField('subheadline', e.target.value)}
              placeholder="Building scalable web applications..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>CTA Button Text</Label>
            <Input
              value={data.cta_text || 'Get In Touch'}
              onChange={(e) => updateField('cta_text', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>CTA Link (anchor)</Label>
            <Input
              value={data.cta_link || '#contact'}
              onChange={(e) => updateField('cta_link', e.target.value)}
              placeholder="#contact"
            />
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={data.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Tell your story..."
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label>Highlights (one per line)</Label>
            <Textarea
              value={data.highlights?.join('\n') || ''}
              onChange={(e) =>
                updateField(
                  'highlights',
                  e.target.value.split('\n').filter((h) => h.trim())
                )
              }
              placeholder="10+ years experience&#10;Led team of 20 engineers&#10;Open source contributor"
              rows={4}
            />
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Skills are managed through the dedicated skills editor. This section will display your
            skills categories.
          </p>
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Projects are managed through the dedicated projects editor. This section will display
            your featured projects.
          </p>
        </div>
      );

    case 'experience':
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Experience entries are managed through the dedicated experience editor.
          </p>
        </div>
      );

    case 'education':
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Education entries are managed through the dedicated education editor.
          </p>
        </div>
      );

    case 'contact':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={data.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={data.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={data.location || ''}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>
        </div>
      );

    case 'custom':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Custom HTML</Label>
            <Textarea
              value={data.custom_html || ''}
              onChange={(e) => updateField('custom_html', e.target.value)}
              placeholder="<div>Your custom HTML</div>"
              rows={6}
            />
          </div>
          <div className="space-y-2">
            <Label>Custom CSS</Label>
            <Textarea
              value={data.custom_css || ''}
              onChange={(e) => updateField('custom_css', e.target.value)}
              placeholder=".custom { color: blue; }"
              rows={4}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GripVertical,
  Plus,
  Eye,
  Globe,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { SectionEditor } from './SectionEditor';
import { AddSectionDialog } from './AddSectionDialog';
import { PublishDialog } from './PublishDialog';
import { toast } from 'sonner';
import { Portfolio, PortfolioSection, SectionType } from '@/types';
import { cn } from '@/lib/utils';

interface PortfolioEditorProps {
  portfolio: Portfolio & { sections: PortfolioSection[] };
}

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

const sectionTypeIcons: Record<SectionType, React.ComponentType<{ className?: string }>> = {
  hero: ({ className }) => <LayoutDashboard className={className} />,
  about: ({ className }) => <User className={className} />,
  skills: ({ className }) => <Code className={className} />,
  projects: ({ className }) => <FolderOpen className={className} />,
  experience: ({ className }) => <Briefcase className={className} />,
  education: ({ className }) => <GraduationCap className={className} />,
  contact: ({ className }) => <Mail className={className} />,
  custom: ({ className }) => <FileText className={className} />,
};

import {
  LayoutDashboard,
  User,
  Code,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
} from 'lucide-react';

export default function PortfolioEditor({ portfolio }: PortfolioEditorProps) {
  const router = useRouter();
  const [sections, setSections] = useState<PortfolioSection[]>(portfolio.sections);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    try {
      const sectionIds = sections.map((s, index) => ({ id: s.id, order: index }));
      const res = await fetch('/api/portfolio/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioId: portfolio.id, sections: sectionIds }),
      });

      if (!res.ok) throw new Error('Failed to save order');

      toast.success('Section order saved');
      setLastSaved(new Date());
    } catch {
      toast.error('Failed to save order');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSection = async (sectionId: string, updates: Partial<PortfolioSection>) => {
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)));
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      const res = await fetch(`/api/portfolio/sections/${sectionId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
      toast.success('Section deleted');
    } catch {
      toast.error('Failed to delete section');
    }
  };

  const handleAddSection = async (sectionData: { type: SectionType; title: string }) => {
    try {
      const formData = new FormData();
      formData.append('type', sectionData.type);
      formData.append('title', sectionData.title);
      formData.append('content', '{}');

      const res = await fetch(`/api/portfolios/${portfolio.id}/sections`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to add section');

      const newSection = await res.json();
      setSections((prev) => [...prev, newSection]);
      toast.success('Section added');
    } catch {
      toast.error('Failed to add section');
    }
  };

  const handlePublish = async () => {
    try {
      const res = await fetch(`/api/portfolios/${portfolio.id}/publish`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to publish');
      toast.success('Portfolio published!');
      router.refresh();
    } catch {
      toast.error('Failed to publish portfolio');
    }
  };

  const handleUnpublish = async () => {
    try {
      const res = await fetch(`/api/portfolios/${portfolio.id}/unpublish`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to unpublish');
      toast.success('Portfolio unpublished');
      router.refresh();
    } catch {
      toast.error('Failed to unpublish portfolio');
    }
  };

  const visibleSections = sections.filter((s) => s.is_visible);
  const hiddenSections = sections.filter((s) => !s.is_visible);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{portfolio.title}</h1>
          <p className="text-muted-foreground">
            {portfolio.is_published ? 'Published' : 'Draft'} • Template: {portfolio.template_id}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {portfolio.is_published ? (
            <Button variant="outline" onClick={handleUnpublish} className="gap-2">
              <Eye className="h-4 w-4" />
              Unpublish
            </Button>
          ) : (
            <Button onClick={() => setShowPublishDialog(true)} className="gap-2">
              <Globe className="h-4 w-4" />
              Publish
            </Button>
          )}
          <Button variant="outline" onClick={handleSaveOrder} disabled={isSaving} className="gap-2">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Order
          </Button>
        </div>
      </div>

      {/* Last saved indicator */}
      {lastSaved && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}

      {/* Add Section Button */}
      <Button
        variant="outline"
        onClick={() => setShowAddSection(true)}
        className="w-full justify-center gap-2 sm:w-auto"
      >
        <Plus className="h-4 w-4" />
        Add Section
      </Button>

      {/* Sections List */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {/* Visible Sections */}
          {visibleSections.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Visible Sections ({visibleSections.length})
                  <span className="text-sm font-normal text-muted-foreground">Drag to reorder</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {visibleSections.map((section, index) => (
                    <SectionEditor
                      key={section.id}
                      section={section}
                      index={index}
                      isEditing={editingSectionId === section.id}
                      onEdit={() => setEditingSectionId(section.id)}
                      onClose={() => setEditingSectionId(null)}
                      onUpdate={handleUpdateSection}
                      onDelete={handleDeleteSection}
                      onToggleVisibility={() =>
                        handleUpdateSection(section.id, { is_visible: false })
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hidden Sections */}
          {hiddenSections.length > 0 && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Hidden Sections ({hiddenSections.length})
                  <span className="text-sm font-normal text-muted-foreground">Click to show</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {hiddenSections.map((section) => (
                    <div
                      key={section.id}
                      className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-accent"
                      onClick={() => handleUpdateSection(section.id, { is_visible: true })}
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <Eye className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{section.title}</p>
                          <p className="text-sm capitalize text-muted-foreground">{section.type}</p>
                        </div>
                      </div>
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {sections.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Plus className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 text-lg font-semibold">No sections yet</h3>
                <p className="mb-6 text-muted-foreground">
                  Add your first section to start building your portfolio
                </p>
                <Button onClick={() => setShowAddSection(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </CardContent>
            </Card>
          )}
        </SortableContext>
      </DndContext>

      {/* Dialogs */}
      <AddSectionDialog
        open={showAddSection}
        onOpenChange={setShowAddSection}
        onAdd={handleAddSection}
      />
      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        isPublished={portfolio.is_published}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        portfolioUrl={`/p/${portfolio.slug}`}
      />
    </div>
  );
}

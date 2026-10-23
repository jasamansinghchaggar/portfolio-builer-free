'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard,
  User,
  Code,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
  Loader2,
  Plus,
} from 'lucide-react';
import { SectionType } from '@/types';
import { cn } from '@/lib/utils';

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: { type: SectionType; title: string }) => void;
}

const sectionTypes: {
  type: SectionType;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Name, headline, sub-headline, CTA button',
    Icon: LayoutDashboard,
  },
  { type: 'about', label: 'About', description: 'Description and highlights', Icon: User },
  {
    type: 'skills',
    label: 'Skills',
    description: 'Skill categories with proficiency levels',
    Icon: Code,
  },
  {
    type: 'projects',
    label: 'Projects',
    description: 'Featured projects with images and links',
    Icon: FolderOpen,
  },
  {
    type: 'experience',
    label: 'Experience',
    description: 'Work history with roles and dates',
    Icon: Briefcase,
  },
  {
    type: 'education',
    label: 'Education',
    description: 'Degrees and certifications',
    Icon: GraduationCap,
  },
  {
    type: 'contact',
    label: 'Contact',
    description: 'Email, phone, location, social links',
    Icon: Mail,
  },
  { type: 'custom', label: 'Custom', description: 'Custom HTML/CSS content', Icon: FileText },
];

export function AddSectionDialog({ open, onOpenChange, onAdd }: AddSectionDialogProps) {
  const [selectedType, setSelectedType] = useState<SectionType>('about');
  const [customTitle, setCustomTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!customTitle.trim()) return;

    setIsLoading(true);
    try {
      onAdd({ type: selectedType, title: customTitle });
      onOpenChange(false);
      setCustomTitle('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>
            Choose a section type and give it a title. You can customize the content after adding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={sectionTypes.find((t) => t.type === selectedType)?.label}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Section Type</Label>
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {sectionTypes.map(({ type, label, description, Icon }) => (
                  <Card
                    key={type}
                    className={cn(
                      'cursor-pointer border-2 transition-all',
                      selectedType === type
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    )}
                  >
                    <RadioGroupItem
                      value={type}
                      className="absolute inset-0 peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"
                    />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !customTitle.trim()}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add Section
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

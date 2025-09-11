import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { projects } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Projects | Careerlink',
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader title="Projects" />
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="space-y-4">
          {projects.map(project => (
            <Link href={`/projects/${project.id}`} key={project.id} className="block">
              <Card className="hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-full h-40 relative rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{objectFit: 'cover'}}
                      className="group-hover:scale-105 transition-transform"
                      data-ai-hint={project.imageHint}
                    />
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                    <div className="text-primary font-semibold flex items-center text-sm">
                        View Project <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

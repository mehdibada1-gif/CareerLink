import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProjectById } from '@/lib/data';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskSimulation } from './_components/task-simulation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return { title: `${project.title} | Careerlink` };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={project.title} showBackButton />
      <div className="p-4 space-y-4">
        <Card className="overflow-hidden">
          <div className="w-full h-48 relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{objectFit: 'cover'}}
              data-ai-hint={project.imageHint}
              priority
            />
          </div>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-sm mb-2">Skills Covered</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <TaskSimulation taskDescription={project.taskDescription} />
      </div>
    </div>
  );
}

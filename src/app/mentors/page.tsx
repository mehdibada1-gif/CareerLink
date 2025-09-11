import { PageHeader } from '@/components/layout/page-header';
import { mentors } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Find a Mentor | Careerlink',
};

export default function MentorsPage() {
  return (
    <div>
      <PageHeader title="Find a Mentor" />
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, skill, industry..." className="pl-9" />
        </div>
        <div className="space-y-4">
          {mentors.map(mentor => (
            <Link href={`/mentors/${mentor.id}`} key={mentor.id}>
              <Card className="hover:bg-accent/10 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/50">
                      <AvatarImage src={mentor.image} alt={mentor.name} data-ai-hint={mentor.imageHint} />
                      <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{mentor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.slice(0, 4).map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

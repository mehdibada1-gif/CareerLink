import { notFound } from 'next/navigation';
import { getMentorById } from '@/lib/data';
import { PageHeader } from '@/components/layout/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatInterface } from './_components/chat-interface';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const mentor = getMentorById(params.id);
  if (!mentor) {
    return { title: 'Mentor Not Found' };
  }
  return { title: `${mentor.name} | Careerlink` };
}

export default function MentorDetailPage({ params }: { params: { id: string } }) {
  const mentor = getMentorById(params.id);

  if (!mentor) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={mentor.name} showBackButton />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                <AvatarImage src={mentor.image} alt={mentor.name} data-ai-hint={mentor.imageHint} />
                <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{mentor.name}</CardTitle>
              <CardDescription>{mentor.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">{mentor.bio}</p>
              <div>
                <h3 className="font-semibold text-sm mb-2 text-center">Skills</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {mentor.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <MessageCircle className="mr-2 h-4 w-4" /> Start Conversation
              </Button>
            </CardContent>
          </Card>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
}

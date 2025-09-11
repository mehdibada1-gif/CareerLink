import Image from 'next/image';
import { PageHeader } from '@/components/layout/page-header';
import { credentials } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'My Credentials | Careerlink',
};

export default function CredentialsPage() {
  return (
    <div>
      <PageHeader title="My Credentials" />
      <div className="p-4 space-y-4">
        {credentials.length === 0 ? (
            <Card className="text-center p-8">
                <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle>No Credentials Yet</CardTitle>
                <CardDescription>Complete projects and courses to earn verified digital credentials.</CardDescription>
            </Card>
        ) : (
            credentials.map(credential => (
                <Card key={credential.id} className="overflow-hidden">
                    <div className="w-full h-32 relative">
                        <Image
                            src={credential.image}
                            alt={credential.title}
                            fill
                            style={{objectFit: 'cover'}}
                            data-ai-hint={credential.imageHint}
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>{credential.title}</CardTitle>
                        <CardDescription>Issued by {credential.issuer} on {credential.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="default" className="bg-primary hover:bg-primary/90">
                           {credential.skill}
                        </Badge>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4"/>
                            View Certificate
                        </Button>
                    </CardFooter>
                </Card>
            ))
        )}
      </div>
    </div>
  );
}

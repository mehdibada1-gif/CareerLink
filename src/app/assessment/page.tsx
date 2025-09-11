import { PageHeader } from '@/components/layout/page-header';
import { AssessmentForm } from './_components/assessment-form';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Skill Assessment | Careerlink',
};

export default function AssessmentPage() {
  const heroImage = placeholderImages.find(p => p.id === 'assessment-hero');
  return (
    <div>
      <PageHeader title="Skill Assessment" showBackButton />
      <div className="p-4">
        <Card className="overflow-hidden border-none shadow-none bg-transparent">
          {heroImage && 
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description}
              width={600}
              height={300}
              className="w-full h-40 object-cover rounded-lg"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          }
          <CardHeader className="px-0">
            <CardTitle>Find Your Path</CardTitle>
            <CardDescription>
              Let's figure out your current skills and career goals to create a learning plan tailored just for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <AssessmentForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

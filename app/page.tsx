import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import Image from 'next/image';
import { placeholderImages } from '@/lib/data';
import { Logo } from '@/components/logo';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-home');

  return (
    <div className="flex flex-col">
      <PageHeader>
        <Logo />
      </PageHeader>
      <div className="p-4 space-y-6">
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <div className="relative">
            {heroImage && 
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                width={600}
                height={200}
                className="w-full h-32 object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="text-accent" />
              Unlock Your Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Start your journey by assessing your skills and get a personalized learning path.
            </p>
            <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/assessment">
                Start Skill Assessment <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:bg-card/90 transition-colors">
            <Link href="/mentors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Find a Mentor</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+150</div>
                <p className="text-xs text-muted-foreground">Experts available</p>
              </CardContent>
            </Link>
          </Card>
          <Card className="hover:bg-card/90 transition-colors">
            <Link href="/projects">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+25</div>
                <p className="text-xs text-muted-foreground">Real-world simulations</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 px-2">Recent Activity</h2>
          <div className="space-y-2">
            <div className="flex items-center p-2 rounded-lg bg-card">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/10/40/40" alt="Avatar" data-ai-hint="person profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">John Doe completed "UI/UX Fundamentals".</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center border-t pt-6">
            <p className="text-xs text-muted-foreground">
                Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.
            </p>
            <div className="relative w-full h-16">
                 <Image 
                    src="https://dare4.masterpeace.org/wp-content/uploads/sites/19/2024/03/EN-Co-Funded-by-the-EU_PANTONE-1536x322.png" 
                    alt="Funded by the European Union"
                    fill
                    style={{objectFit: 'contain'}}
                    data-ai-hint="EU logo"
                />
            </div>
        </div>
      </div>
    </div>
  );
}

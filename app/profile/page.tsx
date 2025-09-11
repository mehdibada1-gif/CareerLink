"use client";

import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    }

    if (loading) {
        return (
             <div>
                 <PageHeader title="Profile" />
                <div className="p-4 text-center">
                    <Card className="p-8 flex justify-center items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    </Card>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div>
                 <PageHeader title="Profile" />
                <div className="p-4 text-center">
                    <Card className="p-8">
                        <CardTitle>Join Careerlink</CardTitle>
                        <CardDescription className="my-4">
                            Sign up or log in to track your progress, connect with mentors, and earn credentials.
                        </CardDescription>
                        <div className="flex flex-col gap-2">
                            <Button asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div>
            <PageHeader title="My Profile" />
            <div className="p-4 space-y-4">
                <Card>
                    <CardHeader className="text-center">
                        <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                            <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`} alt={user.displayName || "User"} data-ai-hint="person portrait" />
                            <AvatarFallback>{user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="mt-4">{user.displayName || 'User'}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" onClick={handleLogout}>
                            <LogOut className="mr-2" />
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

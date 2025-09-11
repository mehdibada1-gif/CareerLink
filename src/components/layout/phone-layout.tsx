import { BottomNav } from './bottom-nav';

export function PhoneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-start min-h-screen bg-muted/40 p-0 sm:p-4">
      <div className="relative w-full max-w-md bg-background shadow-2xl sm:rounded-[40px] overflow-hidden flex flex-col min-h-screen sm:min-h-[844px] sm:max-h-[844px]">
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

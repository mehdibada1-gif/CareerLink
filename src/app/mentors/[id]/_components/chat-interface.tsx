"use client";

import { useState } from 'react';
import { messages as initialMessages, type Message } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="p-4 pt-0">
        <h3 className="text-lg font-semibold mb-2">Previous Conversation</h3>
        <div className="bg-card rounded-lg border p-4 flex flex-col h-96">
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((msg) => (
                <div
                key={msg.id}
                className={cn(
                    'flex items-end gap-2',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
                >
                {msg.sender === 'mentor' && (
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/m1/40/40" data-ai-hint="woman portrait" />
                    <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn(
                    'max-w-[75%] rounded-2xl p-3 text-sm',
                    msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted rounded-bl-none'
                    )}
                >
                    {msg.text}
                </div>
                </div>
            ))}
            </div>
            <div className="mt-4 flex gap-2">
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
            />
            <Button onClick={handleSend} size="icon" className="flex-shrink-0">
                <SendHorizonal className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
            </div>
        </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export default function ProfileMenu() {
  const [lastName, setLastName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const last = data?.user?.user_metadata?.last_name || null;
      setLastName(last);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
        >
          <User className="h-5 w-5" />
          {lastName ? lastName : 'Profile'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-[#1a1a24] text-white shadow-xl">
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

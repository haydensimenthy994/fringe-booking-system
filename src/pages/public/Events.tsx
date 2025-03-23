import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Clock,
  Play,
  Info,
  Search,
  Filter,
  ShieldIcon,
  TicketIcon,
} from 'lucide-react';
import logo from '@/assets/logo.svg';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-white/10 to-gray-800 shadow-md">
            
      <div className="relative">
                
        <AspectRatio ratio={16 / 9}>
                    
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full rounded-t-2xl object-cover opacity-80"
          />
                  
        </AspectRatio>
                
        <div className="absolute top-3 right-3">
                    
          <Badge className="rounded-full bg-pink-600 px-3 py-1 text-xs text-white shadow">
                        {event.category}
                      
          </Badge>
                  
        </div>
                
        <div className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent p-4">
                    
          <h3 className="mb-1 text-lg leading-tight font-bold text-white">
                        {event.title}
                      
          </h3>
                    
          <p className="flex items-center gap-1 text-sm text-gray-300">
                        
            <Calendar className="h-4 w-4" /> {event.date}
                      
          </p>
                    
          <div className="mt-2 flex justify-between text-xs text-gray-400">
                        
            <div className="flex items-center gap-1">
                            
              <MapPin className="h-4 w-4" /> {event.location}
                          
            </div>
                        
            <div className="flex items-center gap-1">
                            
              <Clock className="h-4 w-4" /> {event.time}
                          
            </div>
                      
          </div>
                  
        </div>
              
      </div>
          
    </Card>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select(
          `
          id,
          name,
          description,
          schedule,
          capacity,
          image_url,
          venue_id,
          venues ( name )
        `
        )
        .order('schedule', { ascending: true });

      if (data) {
        const formatted: Event[] = data.map((event: any) => {
          const dateObj = new Date(event.schedule);
          return {
            id: event.id,
            title: event.name,
            date: dateObj.toLocaleDateString(),
            time: dateObj.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            location: event.venues?.name || 'TBA',
            description: event.description,
            image: event.image_url || '/placeholder.svg',
            category: 'Featured',
          };
        });
        setEvents(formatted);
      }
    };
    fetchEvents();
  }, []);

  const spotlight = events[0];

  return (
    <div className="min-h-screen w-full bg-[#0d0f1a] text-white">
      <header className="fixed z-50 w-full border-b border-white/10 bg-[#0d0f1a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Adelaide Fringe Logo" className="h-8" />
          </div>
          <nav className="hidden items-center space-x-8 text-sm md:flex">
            <Link to="/events" className="font-medium text-pink-500">
                            HOME             
            </Link>
                        
            <Link to="/blog" className="text-white/70 hover:text-white">
                            BLOG             
            </Link>
                      
          </nav>
                    
          <Button
            variant="ghost"
            className="text-sm text-white/70 hover:text-white"
          >
                        CONTACT US           
          </Button>
                  
        </div>
              
      </header>
            
      <main className="mx-auto max-w-7xl space-y-16 px-6 pt-32">
                
        <section className="text-center">
                    
          <h1 className="text-5xl leading-tight font-bold md:text-6xl">
                        <span className="text-pink-500">EXPERIENCE</span> <br />{' '}
            ART AND CULTURE           
          </h1>
                    
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
                        Discover extraordinary art events curated to inspire,
            engage, and transform your perspective.           
          </p>
                    
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                        
            <Button className="rounded-md bg-pink-600 px-6 py-4 text-white hover:bg-pink-700">
                            
              <Play className="mr-2 h-5 w-5" /> Watch Preview             
            </Button>
                      
          </div>
                  
        </section>
                
        <section className="flex flex-col justify-center gap-4 md:flex-row">
                    
          <div className="relative w-full md:w-2/3">
                        
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            
              <Search className="h-5 w-5" />
                          
            </div>
                        
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full border-gray-700 bg-gray-800 pl-10 text-white"
            />
                      
          </div>
                    
          <Button className="border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700">
                        
            <Filter className="mr-2 h-4 w-4" /> Filters           
          </Button>
                  
        </section>
                
        <section>
                    
          <Tabs defaultValue="featured">
                        
            <TabsList className="rounded-md border border-gray-800 bg-gray-900 p-1">
                            
              <TabsTrigger
                value="featured"
                className="rounded-md px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              >
                                Featured               
              </TabsTrigger>
                            
              <TabsTrigger
                value="upcoming"
                className="rounded-md px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              >
                                Upcoming               
              </TabsTrigger>
                            
              <TabsTrigger
                value="popular"
                className="rounded-md px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              >
                                Popular               
              </TabsTrigger>
                            
              <TabsTrigger
                value="past"
                className="rounded-md px-4 py-2 text-sm font-semibold text-white/60 transition-colors hover:text-white data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              >
                                Past Events               
              </TabsTrigger>
                          
            </TabsList>
                        
            <TabsContent
              value="featured"
              className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                            
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
                          
            </TabsContent>
                      
          </Tabs>
                  
        </section>
                
        {spotlight && (
          <section className="flex flex-col items-center gap-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 p-6 md:flex-row md:p-10">
                        
            <div className="w-full md:w-1/2">
                            
              <AspectRatio ratio={16 / 9}>
                                
                <img
                  src={spotlight.image}
                  alt={spotlight.title}
                  className="h-full w-full rounded-xl object-cover"
                />
                                
                <div className="absolute inset-0 flex items-center justify-center">
                                    
                  <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-pink-600 text-white shadow-lg hover:bg-pink-700"
                  >
                                        
                    <Play className="h-6 w-6" />
                                      
                  </Button>
                                  
                </div>
                              
              </AspectRatio>
                          
            </div>
                        
            <div className="flex-1 space-y-4">
                            
              <Badge className="rounded-full bg-pink-600 px-3 py-1 text-xs text-white">
                                SPOTLIGHT EVENT               
              </Badge>
                            
              <h2 className="text-2xl font-bold md:text-4xl">
                                {spotlight.title}
                              
              </h2>
                            
              <p className="max-w-prose text-sm text-white/80 md:text-base">
                                {spotlight.description}
                              
              </p>
                            
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                                
                <div className="flex items-center gap-2">
                                    
                  <Calendar className="h-4 w-4" /> {spotlight.date}
                                  
                </div>
                                
                <div className="flex items-center gap-2">
                                    
                  <Clock className="h-4 w-4" /> {spotlight.time}
                                  
                </div>
                                
                <div className="flex items-center gap-2">
                                    
                  <MapPin className="h-4 w-4" /> {spotlight.location}
                                  
                </div>
                              
              </div>
                            
              <Button className="mt-2 rounded-md bg-pink-600 text-white hover:bg-pink-700">
                                
                <TicketIcon className="mr-2 h-4 w-4" /> Get Tickets
                              
              </Button>
                          
            </div>
                      
          </section>
        )}
                
        <section>
                    
          <h2 className="mb-6 text-2xl font-bold">
                        <span className="text-pink-500">Browse by</span>{' '}
            Category           
          </h2>
                    
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                label: 'Workshops',
                image:
                  'https://cwrsilqccmcevrgrycli.supabase.co/storage/v1/object/public/event-images//Workshop-1.jpg',
              },
              {
                label: 'Exhibitions',
                image:
                  'https://cwrsilqccmcevrgrycli.supabase.co/storage/v1/object/public/event-images//Exhibition-2.jpg',
              },
              {
                label: 'Performances',
                image:
                  'https://cwrsilqccmcevrgrycli.supabase.co/storage/v1/object/public/event-images//Performance.-1jpg.jpg',
              },
              {
                label: 'Social Events',
                image:
                  'https://cwrsilqccmcevrgrycli.supabase.co/storage/v1/object/public/event-images//Events-2.jpg',
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="group border-0 bg-gray-900 hover:bg-gray-800"
              >
                <CardContent className="relative aspect-[16/9] overflow-hidden p-0">
                  <img
                    src={category.image}
                    alt={category.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <h3 className="text-xl font-bold text-white">
                      {category.label}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
                  
        </section>
                
        <section className="rounded-2xl bg-gradient-to-r from-pink-900/90 to-pink-800/90 py-16 text-center">
                    
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                        LET'S JOIN US           
          </h2>
                    
          <p className="mx-auto mb-6 max-w-2xl text-white/80">
                        Experience the best art events in the city. Let your
            creativity flow and join our community of art enthusiasts.
                      
          </p>
                    
          <Button className="rounded-md bg-white px-8 py-4 text-lg text-pink-700 hover:bg-gray-100">
                        
            <TicketIcon className="mr-2 h-5 w-5" /> Get Ticket           
          </Button>
                  
        </section>
              
      </main>
            
      <footer className="border-t border-white/10 bg-[#0d0f1a] py-8 text-white">
                
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 md:flex-row">
                    
          <div className="mb-4 flex items-center gap-2 md:mb-0">
                        
            <img src={logo} alt="Adelaide Fringe Logo" className="h-8" />
                      
          </div>
                    
          <div className="text-sm text-white/50">
                        © 2024 COPYRIGHT BRON          
          </div>
                  
        </div>
              
      </footer>
          
    </div>
  );
}

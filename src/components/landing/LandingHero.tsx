
import { Button } from "@/components/ui/button";
import { Home, Users, Building2, Hammer, Scale, ArrowRight } from "lucide-react";

interface LandingHeroProps {
  onSelectRole?: (role: string) => void;
}

const userRoles = [
  {
    label: "Owners",
    desc: "Easy portfolio growth, tenant tracking, revenue optimization.",
    icon: Home,
    color: "bg-blue-100 text-blue-700",
    roleKey: "owner",
  },
  {
    label: "Agents",
    desc: "Industry tools, listings management, deal flow streamlined.",
    icon: Users,
    color: "bg-green-100 text-green-700",
    roleKey: "agent",
  },
  {
    label: "Renters",
    desc: "Find your next home, hassle-free applications, instant updates.",
    icon: Building2,
    color: "bg-yellow-100 text-yellow-700",
    roleKey: "renter",
  },
  {
    label: "Contractors",
    desc: "Task assignment, invoice tracking, opportunities.",
    icon: Hammer,
    color: "bg-orange-100 text-orange-700",
    roleKey: "contractor",
  },
  {
    label: "Lawyers",
    desc: "Compliance tools, document workflow, client connections.",
    icon: Scale,
    color: "bg-purple-100 text-purple-700",
    roleKey: "lawyer",
  },
];

export const LandingHero = ({ onSelectRole }: LandingHeroProps) => (
  <section className="relative bg-gradient-to-br from-indigo-100 via-white to-purple-100 rounded-3xl border border-blue-50 px-8 py-12 mb-8 overflow-hidden shadow-lg">
    {/* Main tagline */}
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold font-heading mb-4 text-gray-900 drop-shadow-lg">
        Welcome to <span className="text-purple-600">NestCore</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-7 max-w-xl mx-auto">
        The all-in-one hub for <span className="font-bold text-blue-700">Owners</span>, <span className="font-bold text-green-700">Agents</span>, <span className="font-bold text-yellow-700">Renters</span>, <span className="font-bold text-orange-700">Contractors</span>, and <span className="font-bold text-purple-700">Lawyers</span>.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {userRoles.map(({ label, desc, icon: Icon, color, roleKey }) => (
          <Button
            key={roleKey}
            size="lg"
            variant="outline"
            className={`min-w-[180px] border-2 border-transparent shadow-sm hover:scale-105 transition-all text-base font-semibold ${color} flex flex-col items-center py-6 px-5`}
            onClick={() => onSelectRole && onSelectRole(roleKey)}
          >
            <Icon className="mb-2 h-8 w-8" />
            <span>{label}</span>
            <span className="block text-xs mt-1 font-normal text-gray-500">{desc}</span>
          </Button>
        ))}
      </div>
      <div className="mt-10">
        <Button
          className="gap-2 text-lg font-bold px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-600 hover:to-purple-500 text-white rounded-xl shadow-xl"
          onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
        >
          Explore Dashboard <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
    {/* Visual accent illustration */}
    <img
      src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
      alt="Modern living space"
      className="absolute right-10 bottom-0 w-[320px] rounded-2xl shadow-2xl opacity-70 hidden lg:block"
      style={{ zIndex: 0 }}
    />
  </section>
);

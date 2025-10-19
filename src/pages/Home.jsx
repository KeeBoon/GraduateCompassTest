import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { 
  LineChart, 
  TrendingUp, 
  BookOpen, 
  Target, 
  BarChart3, 
  Users, 
  FileText,
  Star,
  Compass,
  ArrowRight,
  CheckCircle2,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthDialog } from "../components/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { supabase } from "../integrations/supabase/client"; //testing Supabase

const Index = () => {
  // console.log("[Index] render");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, signOut, isAdmin, loading } = useAuth();
  //testing if Supabase works in Console
  (async () => {
    const { data, error } = await supabase.from("courses").select("*").limit(1);
    if (error) console.error("❌ Supabase error:", error.message);
    else console.log("✅ Supabase working! Sample:", data);
  })();
 

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GraduateCompass
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <User className="h-4 w-4" />
                        Account
                        {isAdmin && <Badge variant="secondary" className="ml-1">Admin</Badge>}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user.email}</span>
                          {isAdmin && (
                            <Badge variant="secondary" className="w-fit mt-1">Administrator</Badge>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setAuthDialogOpen(true)}>
                      Login
                    </Button>
                    <Button onClick={() => setAuthDialogOpen(true)}>
                      Get Started
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-4">
                <Star className="h-4 w-4" />
                Data-Driven Course Selection
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Make{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[gradient_8s_ease_infinite] bg-[length:200%_auto]">
                  Informed Decisions
                </span>
                {" "}About Your Future
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Navigate your university course selection with confidence using comprehensive Graduate Employment Survey data, intelligent comparisons, and personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-shadow">
                  Explore Data
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Take the Quiz
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { label: "Universities", value: "6+" },
                { label: "Course Programs", value: "200+" },
                { label: "Data Points", value: "10K+" },
                { label: "Years of Data", value: "10+" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Powerful Tools for Smart Decisions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to research, compare, and choose the right course for your future.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: BarChart3,
                  title: "Data Explorer",
                  description: "Browse comprehensive GES data with interactive filters, visualizations, and multi-year trend analysis."
                },
                {
                  icon: Target,
                  title: "Course Recommendations",
                  description: "Take our personalized quiz to discover courses that match your interests, priorities, and qualifications."
                },
                {
                  icon: LineChart,
                  title: "Side-by-Side Comparison",
                  description: "Compare up to 5 courses simultaneously across salary, employment rate, stability, and trajectory metrics."
                },
                {
                  icon: BookOpen,
                  title: "Portfolio Manager",
                  description: "Save up to 10 courses, add personal notes, and get portfolio insights based on quality indicators."
                },
                {
                  icon: TrendingUp,
                  title: "Real Salary Analysis",
                  description: "Toggle between nominal and CPI-adjusted real salaries to understand true earning potential over time."
                },
                {
                  icon: FileText,
                  title: "Decision Briefs",
                  description: "Export comprehensive one-page summaries with trade-offs, verdicts, and actionable next steps."
                }
              ].map((feature) => (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Your Journey to the Right Course
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A simple, data-driven process to find your perfect fit.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {[
                {
                  step: "01",
                  title: "Explore & Discover",
                  description: "Browse through comprehensive employment data filtered by university, course, and year. Visualize trends with interactive charts and identify programs that interest you."
                },
                {
                  step: "02",
                  title: "Get Personalized Recommendations",
                  description: "Take our quick quiz to reveal courses aligned with your interests, priorities (salary, stability, passion), and academic qualifications."
                },
                {
                  step: "03",
                  title: "Compare & Analyze",
                  description: "Compare your shortlisted courses side-by-side using key metrics: salary trends, employment rates, stability scores, and quality indices."
                },
                {
                  step: "04",
                  title: "Make Your Decision",
                  description: "Export detailed decision briefs, save courses to your portfolio, and move forward with confidence backed by data."
                }
              ].map((item, index) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-lg text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  What We Track
                </h2>
                <p className="text-xl text-muted-foreground">
                  Comprehensive metrics that matter for your future career success.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Real Salary Growth",
                    description: "Track CPI-adjusted salary trends to understand true earning potential over time."
                  },
                  {
                    title: "Employment Rate",
                    description: "See graduate employment statistics with 95% confidence intervals for reliability."
                  },
                  {
                    title: "Stability Score",
                    description: "Multi-year employment consistency and salary variance analysis."
                  },
                  {
                    title: "Quality Index",
                    description: "Composite score combining salary levels, employment stability, and growth indicators."
                  },
                  {
                    title: "Trajectory Labels",
                    description: "Clear classifications: Rising, Stable, or Declining based on comprehensive trend analysis."
                  },
                  {
                    title: "Course Alternatives",
                    description: "Discover similar courses from the same cluster for expanded options."
                  }
                ].map((metric) => (
                  <div key={metric.title} className="flex gap-4 items-start p-6 rounded-lg bg-card border">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2">{metric.title}</h3>
                      <p className="text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-10" />
          <div className="container mx-auto px-4 relative">
            <Card className="max-w-4xl mx-auto p-12 text-center border-2 shadow-2xl">
              <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your Perfect Course?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students making data-driven decisions about their university education. Start exploring today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 shadow-lg">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Compass className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">GraduateCompass</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Data-driven course selection for informed university decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Data Explorer</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Recommendations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 GraduateCompass. Built by Team Mirth for SC2006 Software Engineering.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

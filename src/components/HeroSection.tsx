import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse-scale">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center glow-effect">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-20 float-animation">
        <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
          <Star className="w-6 h-6 text-secondary" />
        </div>
      </div>
      <div className="absolute bottom-20 left-20 float-animation" style={{ animationDelay: '1s' }}>
        <div className="w-14 h-14 bg-primary/30 rounded-full flex items-center justify-center">
          <Zap className="w-7 h-7 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">TaskFlow</span>
              <br />
              <span className="text-foreground">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Organize your life with our beautiful, intuitive task management platform. 
              Get more done with less stress.
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-8 py-6 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-secondary text-lg px-8 py-6"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-4 group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto glow-effect">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Easy Task Creation</h3>
                <p className="text-muted-foreground">Create and organize tasks in seconds with our intuitive interface</p>
              </div>
              
              <div className="text-center space-y-4 group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto glow-effect">
                  <Star className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Smart Prioritization</h3>
                <p className="text-muted-foreground">AI-powered suggestions to help you focus on what matters most</p>
              </div>
              
              <div className="text-center space-y-4 group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto glow-effect">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Lightning Fast</h3>
                <p className="text-muted-foreground">Blazing fast performance with real-time sync across all devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
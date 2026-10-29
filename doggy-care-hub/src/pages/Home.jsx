
import { Link } from "react-router-dom";
import {
  Syringe,
  Apple,
  HeartPulse,
  ShieldCheck,
  MessageCircle,
  PawPrint,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    title: "Vaccination Schedule",
    description: "Track due dates, records and history.",
    icon: Syringe,
  },
  {
    title: "Nutrition Advice",
    description: "Get guidance by age, breed and weight.",
    icon: Apple,
  },
  {
    title: "Health Guidance",
    description: "Explore general health tips for your dog.",
    icon: HeartPulse,
  },
  {
    title: "Preventive Care",
    description: "Keep track of dental care and checkups.",
    icon: ShieldCheck,
  },
  {
    title: "AI Care Assistant",
    description: "Ask general dog-care questions.",
    icon: MessageCircle,
  },
];

export default function Home() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="landing-eyebrow">
            YOUR DOG'S WELLNESS, IN ONE PLACE
          </span>

          <h1>
            Your Dog's Health Companion
          </h1>

          <h2>Track. Vaccinate. Care.</h2>

          <p>
            Manage your dog's health, vaccinations and care in one place,
            with breed-specific guidance, reminders and an AI-assisted
            chatbot for general dog-care questions.
          </p>

          <div className="landing-actions">
            <Link to="/login" className="button landing-dark-button">
              Log in
            </Link>

            <Link to="/register" className="button landing-outline-button">
              Register
            </Link>
          </div>

          <div className="landing-trust">
            <PawPrint size={18} />
            <span>Helping you care for your best friend, every day.</span>
          </div>
        </div>

        <div className="landing-image-panel">
          <div className="landing-image-circle">
            <span className="landing-paw landing-paw-one">🐾</span>
            <span className="landing-dog" role="img" aria-label="Dog">
              🐕
            </span>
            <span className="landing-paw landing-paw-two">🐾</span>
          </div>

          <div className="landing-image-caption">
            <span className="caption-icon">
              <HeartPulse size={19} />
            </span>
            <span>
              <strong>Care starts with you</strong>
              <small>One hub for your dog's wellbeing</small>
            </span>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading">
          <span className="landing-eyebrow">WHAT YOU CAN DO</span>
          <h2>Everything your dog needs, in one hub.</h2>
          <p>
            Simple tools to help you organize your dog's everyday care.
          </p>
        </div>

        <div className="landing-feature-grid">
          {features.map(({ title, description, icon: Icon }) => (
            <article className="landing-feature-card" key={title}>
              <span className="landing-feature-icon">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-bottom-cta">
        <div>
          <span className="landing-eyebrow">START YOUR JOURNEY</span>
          <h2>Make dog care easier to manage.</h2>
          <p>Create an account to start organizing your dog's care.</p>
        </div>

        <Link to="/register" className="button landing-dark-button">
          Create an Account
        </Link>
      </section>
    </main>
  );
}

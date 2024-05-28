import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.svg";
import LandingImage from "../assets/main.svg";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 mb-20 mt-6">
        <Image src={Logo} alt="logo" />
      </header>
      <section
        id="content"
        className="flex items-center justify-between max-w-6xl sm:px-8 px-4 mx-auto my-6 py-10"
      >
        <div className="flex flex-col items-center sm:items-start justify-start text-left gap-8 flex-1">
          <h1 className="font-bold capitalize text-5xl sm:text-7xl text-center sm:text-left">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-lg text-center sm:text-justify">
            Jobify simplifies your job search by helping you manage and track
            your application progress. With features to organize your
            applications and provide detailed status analytics, Jobify ensures
            you stay on top of your job hunt. Sign up today and streamline your
            path to the perfect job with Jobify!
          </p>
          <Button asChild>
            <Link href="/add-job"> Get Started</Link>
          </Button>
        </div>
        <Image
          src={LandingImage}
          alt="landing image"
          className="w-[400px] hidden sm:block"
        />
      </section>
    </main>
  );
}

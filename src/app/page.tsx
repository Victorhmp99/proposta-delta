import { Hero, TopBar } from "@/components/Hero";
import { MethodDelta } from "@/components/MethodDelta";
import {
  Origin,
  Problem,
  Difference,
  Team,
  AnchorTeam,
  AnchorSecretary,
  CRC,
  Cases,
  Plans,
  Estrutura,
  CrmResale,
  Onboarding,
  Closing,
  Club,
  Footer,
} from "@/components/Sections";

export default function Home() {
  return (
    <main className="flex flex-col">
      <TopBar />
      <Hero />
      <Origin />
      <Problem />
      <Difference />
      <MethodDelta />
      <Team />
      <AnchorTeam />
      <AnchorSecretary />
      <CRC />
      <Cases />
      <Plans />
      <Estrutura />
      <CrmResale />
      <Onboarding />
      <Closing />
      <Club />
      <Footer />
    </main>
  );
}

import { HelpingHand, Plus } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Image } from "@/components/image";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { LayoutHero, layoutHeroImage } from "@/components/layout/hero";
import { MemberCard } from "@/components/member-card";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Textarea } from "@/components/textarea";

import { createServer } from "@/server";
import { getSession } from "@/server/authentication/session";

import { typography } from "@/utilities/typography";

export type ProjectContactPageProps = {
  params: {
    id: string;
  };
};

const ProjectContactPage = async ({
  params: { id },
}: ProjectContactPageProps) => {
  const server = await createServer();

  const project = await server.project.getProject({ id });

  const session = await getSession();

  const isLeader = session
    ? await server.project.isProjectLeader({ id, userId: session?.user.id })
    : false;

  return (
    <LayoutHero
      backgroundImage={
        project.image ? (
          <Image
            alt={project.name}
            className={layoutHeroImage()}
            fill
            src={project.image}
            unoptimized
          />
        ) : undefined
      }
      image={
        project.image ? (
          <Image
            alt={project.name}
            className={layoutHeroImage({ variant: "foreground" })}
            fill
            src={project.image}
            unoptimized
          />
        ) : undefined
      }
      title={project.name}
    >
      <section className="py-8">
        <div className="container mx-auto grid items-center gap-x-8 md:grid-cols-5">
          <div className="flex items-center justify-start text-left md:col-span-3">
            <h1 className="text-3xl font-semibold">Help Us with the project</h1>
          </div>
          <div className="relative md:col-span-2">
            {/* Vertical Line */}
            <div
              className="absolute inset-y-0 left-0 hidden w-1 md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, white, transparent)",
              }}
            ></div>
            <Label>Email</Label>
            <Input type="email" id="email" placeholder="Email" />
            <Label>Help type</Label>
            <RadioGroup defaultValue="knowledge">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="knowledge" id="r1" />
                <Label htmlFor="r1">Knowledge</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="financial" id="r2" />
                <Label htmlFor="r2">Financial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="r3" />
                <Label htmlFor="r3">Other</Label>
              </div>
            </RadioGroup>
            <Label>Message</Label>
            <Textarea id="message" placeholder="Message" rows={4} />
          </div>
        </div>
      </section>
    </LayoutHero>
  );
};

export default ProjectContactPage;

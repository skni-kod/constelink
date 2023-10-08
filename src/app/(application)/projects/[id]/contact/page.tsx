import { Button } from "@/components/button";
import { Card, CardContent, CardFooter } from "@/components/card";
import { Image } from "@/components/image";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { LayoutHero, layoutHeroImage } from "@/components/layout/hero";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Textarea } from "@/components/textarea";

import { createServer } from "@/server";

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
        <div className="container mx-auto flex flex-col items-center gap-8 text-center lg:flex-row lg:text-start">
          <div className="grow">
            <h2
              className={typography({
                className: "[text-wrap:balance]",
                variant: "heading-2",
              })}
            >
              Interested in our project?
            </h2>
            <p
              className={typography({
                className: "my-4 max-w-screen-sm [text-wrap:balance]",
                variant: "lead",
              })}
            >
              Consider supporting us with your knowledge, financially or in any
              other way.
            </p>
          </div>
          <Card className="w-full max-w-md shrink-0 text-start">
            <CardContent className="flex flex-col gap-6">
              <div className="pt-6">
                <Label className="mb-2 block">Email</Label>
                <Input type="email" />
              </div>
              <div>
                <Label className="mb-2 block">Help type</Label>
                <RadioGroup defaultValue="knowledge">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="r1" value="knowledge" />
                    <Label htmlFor="r1">Knowledge</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="r2" value="financial" />
                    <Label htmlFor="r2">Financial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="r3" value="other" />
                    <Label htmlFor="r3">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="mb-2 block">Message</Label>
                <Textarea className="resize-none" id="message" rows={4} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Send</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </LayoutHero>
  );
};

export default ProjectContactPage;

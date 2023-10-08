import { button } from "@/components/button";
import { Image } from "@/components/image";
import { Link } from "@/components/link";

export type ProjectCardProps = {
  description?: string;
  height: number;
  href: string;
  src: string;
  title: string;
  width: number;
};

const shortenText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const ProjectCard = ({
  description,
  height,
  href,
  src,
  title,
  width,
}: ProjectCardProps) => {
  return (
    <div className="flex max-w-xl grow flex-col items-center gap-4 rounded-2xl border-2 border-accent-foreground p-8 dark:border-white lg:ml-8 lg:flex-row">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-accent-foreground dark:shadow-white lg:right-12 lg:h-52 lg:w-52">
        <Image
          alt="projekt"
          className="h-full w-full object-cover"
          height={height}
          src={src}
          unoptimized
          width={width}
        />
      </div>
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <div className="mb-4 text-lg">{shortenText(description, 100)}</div>
        )}
        <Link className={button()} href={href}>
          Read More
        </Link>
      </div>
    </div>
  );
};

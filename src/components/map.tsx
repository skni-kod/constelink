export type MapProps = {
  query: string;
};

export const Map = ({ query }: MapProps) => (
  <iframe
    className="aspect-[3/2] max-h-80 w-full rounded-md"
    src={`https://www.google.com/maps?q=${query}&hl=de&output=embed`}
  />
);

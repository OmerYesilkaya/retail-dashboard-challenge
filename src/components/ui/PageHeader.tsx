type Props = {
  title: string;
};

export function PageHeader({ title }: Props) {
  return <h1 className="text-3xl font-bold text-black">{title}</h1>;
}

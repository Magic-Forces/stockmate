type HeaderProps = {
  title: string;
  right?: React.ReactNode;
};

function Header({ title, right }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
      <h1 className="text-2xl font-bold">{title}</h1>
      {right}
    </div>
  );
}

export default Header;

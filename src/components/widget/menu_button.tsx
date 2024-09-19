interface ActionBar {
  onClick: () => void;
}

const MenuButton: React.FC<ActionBar> = ({ onClick }) => {
  return (
    <div
      className="group h-6 ml-5 xl:hidden flex flex-col justify-between items-start "
      onClick={onClick}
    >
      <span className="bg-white w-6 group-hover:w-5 h-1 duration-300 rounded-full" />
      <span className="bg-white w-4 h-1 group-hover:w-full duration-300 rounded-full" />
      <span className="bg-white w-7 group-hover:w-6 h-1 duration-300 rounded-full" />
    </div>
  );
};

export default MenuButton;

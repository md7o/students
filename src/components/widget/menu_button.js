const MenuButton = () => {
  return (
    <div className="group  w-8 h-7 flex flex-col justify-between items-start">
      <span className="bg-white w-full group-hover:w-5 h-1 duration-300 rounded-full" />
      <span className="bg-white w-5 h-1 group-hover:w-full duration-300 rounded-full" />
      <span className="bg-white w-full group-hover:w-6 h-1 duration-300 rounded-full" />
    </div>
  );
};

export default MenuButton;

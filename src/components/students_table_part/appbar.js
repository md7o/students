import DropDownButton from "../../components/widget/dropDownButton";

const AppBar = () => {
  return (
    <div className=" w-full">
      <div className="flex justify-between items-center">
        <p className="text-3xl p-4 font-bold">Logo</p>
        <div className="flex justify-center items-center px-10">
          <p className="mx-5">Name</p>
          <p>image</p>
          <DropDownButton />
        </div>
      </div>
      <div className="h-hightLine w-full bg-shadowLine" />
    </div>
  );
};

export default AppBar;

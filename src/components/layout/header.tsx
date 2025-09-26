import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full p-3 border border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div>Logo</div>
        <div>
            <User size={18}/>
        </div>
      </div>
    </div>
  );
};

export default Header;

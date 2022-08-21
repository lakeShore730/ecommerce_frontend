import { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import siteSettings from "../../settings/site-settings";
import Container from "../ui/container";
import SearchInputField from "../ui/SearchInputField";
import { User, ShoppingBag, Sun, Moon, AlignLeft, LogOut } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { resetLogin } from "../../redux/slices/userSlice";
import { getErrorMessage } from "../../utils/utils";
import getAllCategoryApi from "../../services/category/getAllCategoryApi";
import logoutApi from "../../services/auth/logout-api";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.value);
  const cartList = useSelector((state) => state.cart.cartList);

  const [categoryList, setCategoryList] = useState([]);

  const toggleMode = () => {
    dispatch(toggleTheme());
  };

  const setCategoryData = async () => {
    try {
      const categoryResData = await getAllCategoryApi();
      setCategoryList(categoryResData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategoryData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(resetLogin());
      toast.success("You are successfully logout.");
      navigate("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error, []);
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-between gap-2">
        <Link
          className="flex-none font-semibold text-xl text-gray-800 dark:text-white"
          to="/"
        >
          {siteSettings.appName}
        </Link>
        <div className="flex-1 max-w-[750px]">
          <SearchInputField categoryList={categoryList} />
        </div>
        <div className="flex-none flex items-center gap-5">
          <Menu as="div" className="relative inline-block">
            <div>
              <Menu.Button className="flex items-center">
                <User size={20} className="cursor-pointer dark:text-white" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Link to="/account">
                  <div className="px-2 py-1">
                    <Menu.Item>
                      {({ active }) => {
                        if (active) {
                          return (
                            <div className="w-full flex items-center gap-2 rounded-sm px-2 py-1 cursor-pointer bg-primary text-yellow-50">
                              <User size={20} />
                              <p>Profile</p>
                            </div>
                          );
                        }
                        return (
                          <div className="w-full flex items-center gap-2 rounded-sm px-2 py-1 cursor-pointer">
                            <User size={20} />
                            <p>Profile</p>
                          </div>
                        );
                      }}
                    </Menu.Item>
                  </div>
                </Link>
                <div className="px-2 py-1">
                  <Menu.Item>
                    {({ active }) => {
                      if (active) {
                        return (
                          <Link to="/orders/">
                            <div className="w-full flex items-center gap-2 rounded-sm px-2 py-1 cursor-pointer bg-primary text-yellow-50">
                              <AlignLeft size={20} />
                              <p>Order</p>
                            </div>
                          </Link>
                        );
                      }
                      return (
                        <div className="w-full flex items-center gap-2 rounded-sm px-2 py-1 cursor-pointer">
                          <AlignLeft size={20} />
                          <p>Order</p>
                        </div>
                      );
                    }}
                  </Menu.Item>
                </div>
                <div className="px-2 py-1">
                  <Menu.Item>
                    {({ active }) => {
                      if (active) {
                        return (
                          <div
                            className="w-full flex items-center gap-2 rounded-sm px-2 py-1 cursor-pointer bg-primary text-yellow-50"
                            onClick={handleLogout}
                          >
                            <LogOut size={20} />
                            <p>Logout</p>
                          </div>
                        );
                      }
                      return (
                        <div className="w-full flex items-center gap-2 rounded-sm px-2 py-1 cursor-pointer">
                          <LogOut size={20} />
                          <p>Logout</p>
                        </div>
                      );
                    }}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Link to="/cart" className="relative">
            <ShoppingBag size={20} className="cursor-pointer dark:text-white" />
            {cartList.length ? (
              <div className="absolute flex items-center justify-center  w-[20px] h-[20px] rounded-full text-center text-[10px] top-[0] right-[-10px] bg-red-600 text-white ">
                {cartList.length}
              </div>
            ) : null}
          </Link>
          {currentTheme === "light" ? (
            <Moon
              size={20}
              onClick={toggleMode}
              className="cursor-pointer dark:text-white"
            />
          ) : (
            <Sun
              size={20}
              onClick={toggleMode}
              className="cursor-pointer dark:text-white"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Nav;

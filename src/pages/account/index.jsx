import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Edit2, User } from "react-feather";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Container from "../../components/ui/container";
import { getDate, getErrorMessage } from "../../utils/utils";
import updateUserApi from "../../services/account/updateUserApi";

const validateUserData = (props) => {
  const { fullName, email, phoneNumber } = props;

  if (!fullName.trim().length) {
    return { isValidated: false, message: "Full name is required." };
  }

  if (!email.trim().length) {
    return { isValidated: false, message: "Email is required." };
  }

  if (phoneNumber && phoneNumber.length !== 10) {
    return {
      isValidated: false,
      message: "Phone number should be ten digits number.",
    };
  }

  return { isValidated: true, message: "User data is verified." };
};

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [profileImage, setProfileImage] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setFullName(user?.name);
    setEmail(user?.email);
    setAddress(user?.location || "");
    setPhoneNumber(user?.phone_number || "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValidated, message } = validateUserData({
      fullName,
      email,
      phoneNumber,
    });

    if (!isValidated) {
      toast.error(message);
      return;
    }

    setIsSubmitted(true);

    const userFormData = new FormData();
    userFormData.append("name", fullName);
    userFormData.append("email", email);
    userFormData.append("location", address);
    userFormData.append("phone_number", phoneNumber);
    if (profileImage) userFormData.append("profile_image", profileImage);

    try {
      const userResponseData = await updateUserApi({
        userId: user.id,
        data: userFormData,
      });

      dispatch(setUser(userResponseData));
      toast.success("User details successfully updated.");
    } catch (error) {
      const validatorKeys = [
        "name",
        "email",
        "location",
        "phone_number",
        "profile_image",
      ];
      const errorMessage = getErrorMessage(error, validatorKeys);
      toast.error(errorMessage);
    }

    setIsSubmitted(false);
  };

  return (
    <Container className="min-h-[calc(100vh-200px)]">
      <div className="md:flex md:gap-2 lg:gap-5">
        <div className="pt-20 pb-10 w-full max-w-[450px]">
          <div className="shadow p-8 dark:bg-[#222222] rounded-md">
            <div className="flex justify-center relative">
              <div className="relative">
                {user.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="user profile"
                    className="w-[120px] h-[120px] rounded-full mx-auto"
                  />
                ) : (
                  <User
                    size={100}
                    className="text-gray-600 dark:text-yellow-50"
                  />
                )}
                <div className="absolute right-[-13px] bottom-[5px] text-primary">
                  <label>
                    <Edit2 size={15} className="cursor-pointer" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        setProfileImage(e.target.files[0] || null)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-center font-bold text-xl dark:text-yellow-50">
                {user.name}
              </p>
              <p className="text-center text-sm text-gray-700 mt-2 dark:text-yellow-50">
                {user.email}
              </p>

              <div>
                <p className="mt-5 font-bold text-gray-700 pb-[1px] border-gray-400 border-b inline-block dark:text-yellow-50">
                  Other Info
                </p>
                <div className="flex gap-2 mt-2">
                  <div>
                    <p className="text-gray-700 text-md mt-1 dark:text-yellow-50">
                      Contact :
                    </p>
                    <p className="text-gray-700 text-md mt-1 dark:text-yellow-50">
                      Address :
                    </p>
                    <p className="text-gray-700 text-md mt-1 dark:text-yellow-50">
                      Join Date :
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 text-md mt-1 dark:text-yellow-50">
                      {user.phone_number || "-"}
                    </p>
                    <p className="text-gray-700 text-md mt-1 dark:text-yellow-50">
                      {user.location || "-"}
                    </p>
                    <p className="text-gray-700 text-md mt-1 dark:text-yellow-50">
                      {getDate(user.date_joined)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <form
            className="w-full max-w-[700px] shadow p-7 mt-20 rounded-md dark:bg-[#222222]"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="address"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                className="border bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                className="border  bg-transparent block w-full rounded-md p-1 text-gray-700 dark:text-white"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) setPhoneNumber(value);
                }}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-primary text-white px-5 py-1 rounded-md"
                type="submit"
              >
                {isSubmitted ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Account;

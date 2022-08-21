import TopHeader from "../components/header/top-header";
import Nav from "../components/header/nav";
import Footer from "../components/footer/footer";

const AppLayout = (props) => {
  const { children, ...others } = props;

  return (
    <div>
      <TopHeader />
      <div className="mt-8 py-5 sticky top-0 bg-white z-10 dark:bg-[#222222]">
        <Nav />
      </div>
      <div {...others}>{children}</div>
      <Footer className="mt-16" />
    </div>
  );
};

export default AppLayout;

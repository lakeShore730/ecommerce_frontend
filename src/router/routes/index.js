import appRoutes from "./appRoutes";
import authRoutes from "./authRoutes";

const allRoutes = [...authRoutes, ...appRoutes];

export default allRoutes;

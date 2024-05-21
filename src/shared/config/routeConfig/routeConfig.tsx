import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {AboutPage} from "pages/AboutPage";
import {NotFoundPage} from "pages/NotFoundPage";
import {ProfilePage} from "pages/ProfilePage";
import {BoatPage} from "pages/BoatPage";
import { AdminPage } from "pages/AdminPage";
import {OrdersPage} from "../../../pages/OrdersPage";
import AdsPage from "../../../pages/AdsPage/ui/Page/AdsPage";

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    PROFILE = "profile",
    BOAT_PAGE = 'boat_page',
    ADMIN_PAGE = 'admin_page',
    ORDERS_PAGE = 'orders_page',
    ADS_PAGE = 'ads_page',
    NOT_FOUND = 'not_found',
}
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.BOAT_PAGE]: '/boat/',
    [AppRoutes.ADMIN_PAGE]: '/admin',
    [AppRoutes.ORDERS_PAGE]: '/orders/',
    [AppRoutes.ADS_PAGE]: '/ads',

    [AppRoutes.NOT_FOUND]: '*'
}

export const routerConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]:{
        path: RoutePath.about,
        element: <AboutPage/>
    },
    [AppRoutes.PROFILE]:{
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage/>
    },
    [AppRoutes.BOAT_PAGE]:{
        path: `${RoutePath.boat_page}:id`,
        element: <BoatPage/>
    },
    [AppRoutes.ADMIN_PAGE]:{
        path: RoutePath.admin_page,
        element: <AdminPage/>
    },
    [AppRoutes.ORDERS_PAGE]:{
        path: `${RoutePath.orders_page}:id`,
        element: <OrdersPage/>
    },
    [AppRoutes.ADS_PAGE]:{
        path: RoutePath.ads_page,
        element: <AdsPage/>
    },
    [AppRoutes.NOT_FOUND]:{
        path: RoutePath.not_found,
        element:<NotFoundPage/>
    }
}

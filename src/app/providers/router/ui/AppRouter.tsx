import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routerConfig} from "shared/config/routeConfig/routeConfig";

export const AppRouter = () => {
    return (
        <Routes>
            {
                Object.values(routerConfig)
                    .map(({element, path}) => {
                        return(
                            // <div className={'page-wrapper'}>
                            <Route
                                key = {path}
                                element = {(
                                    <div className={'page-wrapper'}>
                                        {element}
                                    </div>
                                )}
                                path={path}
                            />
                            /*</div>*/
                        )
                    })

            }
        </Routes>
    );
};


import React from "react";
import { Route, Redirect, Switch } from "react-router-dom"

import MainLayout from "./yandex/layouts/MainLayout/MainLayout";

import Err404Page from "./yandex/page/Err404Page/Err404Page";
import HomePage from "./yandex/page/HomePage/HomePage";
import TablePage from "./yandex/page/TablePage";
import OfferPage from "./yandex/page/OfferPage/offerPage";
import AddOfferPage from "./yandex/page/AddOfferPage";
import Auth from "./yandex/page/Auth/Auth";
import UserPage from "./yandex/page/UserPage";


import DragNDropProvider from "./yandex/providers/dragNDropProvider/dragNDropProvider";

import { Provider } from "react-redux"
import { createStore } from "./yandex/store/store";
import AuthProvider from "./yandex/providers/AuthProvider/AuthProvider";
import ProtectedRoute from "./yandex/page/components/isAuthProtectedRoute/isAuthProtectedRoute";
import TestMaps from "./yandex/page/TestMaps/TestMaps";
import RandomWhat from "./yandex/page/RandomWhat/RandomWhat";

const store = createStore()

const App = () => {

    return <>
        <Provider store={store}>
            <AuthProvider>
                <MainLayout>
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/table' exact component={TablePage} />
                        <Route path='/auth' exact component={Auth} />
                        {/* <ProtectedRoute path='/auth' exact component={Auth} /> */}
                        <Route path='/user/:id' exact component={UserPage} />
                        <Route path='/offer/:category/:id' exact component={OfferPage} />
                        <Route path='/random/:what' exact component={RandomWhat} />
                        <Route path='/maps' exact component={TestMaps} />
                        <Route path='/404' exact component={Err404Page} />
                        <Route path='/add' exact>
                            <DragNDropProvider>
                                <AddOfferPage />
                            </DragNDropProvider>
                        </Route>
                        <ProtectedRoute path='/edit/:category/:id' exact component={AddOfferPage} />


                        <Redirect to='/404' />

                    </Switch>
                </MainLayout>
            </AuthProvider>
        </Provider>
    </>
}

export default App
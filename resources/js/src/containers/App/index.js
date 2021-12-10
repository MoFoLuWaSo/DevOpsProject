import React, {memo, useEffect, useState} from "react";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from 'antd';
import AppLocale from "../../lngProvider";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import MainApp from "./MainApp";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecords, getUser, setInitUrl, setSubscriptions, setTradingPairs} from "../../appRedux/actions";
import {GET_MY_SUBSCRIPTIONS, GET_TRADING_PAIRS} from "../../constants/ServerUrl";

const App = () => {
    const dispatch = useDispatch();
    const {initURL, authUser} = useSelector(({auth}) => auth);
    const [mount, isMount] = useState(true);
    const {locale, isDirectionRTL} = useSelector(({settings}) => settings);
    const currentAppLocale = AppLocale[locale.locale];
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    useEffect(() => {


        dispatch(setInitUrl(location.pathname));
        history.push(location.pathname);

    }, [dispatch, initURL, location.pathname, location.search]);

    useEffect(() => {
        let timeOutId = 0;
        if (mount) {

            timeOutId = setTimeout(() => {
                mountedRequests();
            }, 1000);
        }
        return () => {

            clearTimeout(timeOutId);
            isMount(false);
        }
    }, []);


    const mountedRequests = () => {
        dispatch(getUser());
        getTradingPairs();
        getSubscriptions();
    }

    const getTradingPairs = () => {

        fetchRecords(GET_TRADING_PAIRS).then(res => {
            if (res.success) {
                dispatch(setTradingPairs(res.pairs));
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const getSubscriptions = () => {

        fetchRecords(GET_MY_SUBSCRIPTIONS).then(res => {
            dispatch(setSubscriptions(res));

        }).catch(err => {

        });
    }
    return (
        <ConfigProvider locale={currentAppLocale.antd} direction={isDirectionRTL ? 'rtl' : 'ltr'}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}>
                {/*<Route path={`${match.url}`} component={MainApp}/>*/}
                <Switch>
                    <Route path={`${match.url}`} component={MainApp}/>
                </Switch>
            </IntlProvider>
        </ConfigProvider>
    )
};


export default memo(App);

import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';

const cached = {};
function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

export default ({history, app}) => {
    return (
        <Router history={history}>
            <Route path="/">
                <Route path="admin.php">
                    <Route path="IndexManage/alone" getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            registerModel(app, require('./homeCms/models/homeCms'));
                            cb(null, require('./homeCms/routers/HomeCms'))
                        }, 'HomeCms')
                    }}>
                    </Route>
                </Route>
            </Route>
        </Router>
    );
}
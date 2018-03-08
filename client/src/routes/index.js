export default {
    childRoutes: [
        {
            path: '/',
            component: require('../containers/app'),
            childRoutes: [
                {
                    path: 'home',
                    getComponent (location, cb) {
                        cb(null, require('../containers/home'));
                    }
                }, {
                    path: '*',
                    getComponent (location, cb) {
                        cb(null, require('../components/NotFound'));
                    }
                }
            ],
            indexRoute: {
                getComponent (location, cb) {
                    cb(null, require('../containers/home'));
                }
            }
        }
    ]
};

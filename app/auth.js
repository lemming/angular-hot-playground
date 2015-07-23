export default function(ngModule) {
    ngModule.factory('Auth', Auth);
}

function Auth($q) {
    const auth = {
        loggedIn: false,
        isLoggedIn: function() {
            const deferred = $q.defer();

            deferred.resolve(auth.loggedIn);
            return deferred.promise;
        },
        login: function() {
            const deferred = $q.defer();

            auth.loggedIn = true;
            deferred.resolve();

            auth.onLoginSuccess();

            return deferred.promise;
        },
        onLoginSuccess: function(callback) {
            if (callback) {
                auth.onLoginSuccess.callback = callback;
            } else {
                let callback = auth.onLoginSuccess.callback;
                delete auth.onLoginSuccess.callback;
                callback();
            }
        }
    };

    return auth;
};

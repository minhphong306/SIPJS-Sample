var simple;
var ua;
var app = angular.module('app', []);
app.controller('indexCtrl', function ($scope) {
    $scope.name = 'phongdm';
    $scope.mysip = '3000@nguyenphuongha.com';
    $scope.othersip = '3600@nguyenphuongha.com';
    $scope.auth_username = '3000';
    $scope.password = '3000';
    $scope.ws_server = 'ws://nguyenphuongha.com:5066';
    $scope.logs = [];

    appendLog = function (logType, logMessage) {
        var log = {};
        log['type'] = logType;
        log['message'] = logMessage;
        $scope.logs.push(log);
    }

    $scope.initPhone = function () {
        appendLog("INIT PHONE", "");

        ua = new SIP.UA({
            uri: $scope.mysip,
            wsServers: [$scope.ws_server],
            authorizationUser: $scope.auth_username,
            password: $scope.password,
            displayName: $scope.name,
            register: true
        });

        // Handle UA
        ua.on('connected', function (e) {
            appendLog("INIT PHONE", "Connected to websocket");
            $scope.$apply();
        });

        ua.on('disconnected', function (e) {
            appendLog("INIT PHONE", "Can't connect to websocket");
            $scope.$apply();
        });

        ua.on('registered', function (e) {
            appendLog("INIT PHONE", "Regist success! ");
            $scope.$apply();
        });

        ua.on('unregistered', function (response, cause) {
            appendLog("INIT PHONE", "Regist success! ");
            $scope.$apply();
        });

        simple = new SIP.WebRTC.Simple({
            ua: ua,
            media: {
                remote: {
                    video: document.getElementById('remoteVideoFrame')
                }, local: {
                    video: document.getElementById('localVideoFrame')
                }
            },
        });


    };


});
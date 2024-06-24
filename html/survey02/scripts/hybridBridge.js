var HybridPlatform = {
		// callback function mechanism.
		callbackId : Math.floor(Math.random() * 2000000000),
		callbackParent : 'HybridPlatform.callbacks.',
		callbacks : {}

};



var BridgeJS = function() {
	var deviceOS = "WEB";

	var _init = function() {
		deviceOS = _osPasser();
	};

	var _osPasser = function() {
		var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

        if ( varUA.indexOf('android') > -1) {
            return "ANDROID";
        } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
            return "IOS";
        } else {
            return "WEB";
        }

	};

	/*
	Param : api	: api명
	PERMIT01 : 권한상태
	PERMIT02 : 삼성헬스 권한
	PERMIT03 : 마이크 권한
	PERMIT04 : 카메라 권한
	PERMIT05 : 저장소 권한
	PERMIT06 : 전화 상태 권한


	VOICE01 : 음성인식

	FOOD01 : 음식사진 카메라 화면
	FOOD02 : 음식사진 수정화면

	HEALTH01 : 걷기새로고침


	PHONE01 : 전화 상태 가져오기(전화번호, FCM Token)
	PHONE02 : 권한 이동페이지 팝업
	PHONE03 : 네이티브 다이얼로그


	{
		api : api명,
		param : {startTime:1, endTime:2},
		success : success callback 함수명,
		fail : fail callback 함수명
	}
	function testSucc(retval){

	}
	function testFail(retval){

	}
	BridgeJS.postMessage("test", {a:1, b:2}, testSucc, testFail);
	*/
	var _postMessage = function(api, param, success, fail) {
		if(deviceOS == 'WEB') {
			alert("Web Browser is Not Support.");
			return;

		}else{

			var data = {
				api : api,
				param : param
		    };

			var scbID = '';
			var fcbID = '';

			if(typeof success === 'function') {
				scbID = '_' + HybridPlatform.callbackId++;
				HybridPlatform.callbacks[scbID] = function() {
					success.apply(null, arguments);
					delete HybridPlatform.callbacks[scbID];
				}
			}

			if(typeof fail === 'function') {
				fcbID = '_' + HybridPlatform.callbackId++;
				HybridPlatform.callbacks[fcbID] = function() {
					fail.apply(null, arguments);
					delete HybridPlatform.callbacks[fcbID];
				}
			}

			/* web -> native bridge call */

			scbID = scbID != '' ? HybridPlatform.callbackParent + scbID : '';
			fcbID = fcbID != '' ? HybridPlatform.callbackParent + fcbID : '';
			data["scb"] = scbID;
			data["fcb"] = fcbID;
			data = JSON.stringify(data);

			if(deviceOS == 'ANDROID') {
				if(typeof(Android) != 'undefined'){
				    Android.webToDevice(data);
				} else {
					console.log('hybridBridge.js Android I/F error');
				}

			} else if(deviceOS == 'IOS') {
				if(typeof(webkit) != 'undefined'){
				    webkit.messageHandlers.invoke.postMessage(data)
                } else {
					console.log('hybridBridge.js ios I/F error');
				}
			}
		}
	};


	return {
		Init : _init,
		osPasser : _osPasser,
		postMessage : _postMessage
	};
}();

BridgeJS.Init();

var CommonJS = {};

function CommonClass() {

	// #region callAjax - ajax 호출 함수
	// 사용법 : callAjax('Services/GetFirstAddress.aspx', 'POST', {}, function
	// (responseText) { do something..});
	this.callAjax = function (url, type, data, callbackSuccess, callbackFailure) {
		$.ajax({
			url: url,
			type: type,
			data: data,
			contentType: 'application/json;charset=UTF-8',
			dataType: 'json',
			beforeSend: function (xmlHttpRequest) {
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			success: function (response, status, xhr) {
				if (callbackSuccess != null) {
					callbackSuccess(response, status, xhr);
				}
			},
			error: function (xhr, status, errorThrown) {
				if (callbackFailure != null) {
					callbackFailure(xhr, status, errorThrown);
				} else {
					if (xhr.status == 200) {
						return false;
					}
				}
			}
		});
	};
	// #endregion

	this.callSyncAjax = function (url, type, data, callbackSuccess, callbackFailure) {
		$.ajax({
			url: url,
			type: type,
			data: data,
			dataType: 'json',
			async: false,
			beforeSend: function (xmlHttpRequest) {
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			success: function (response, status, xhr) {
				if (callbackSuccess != null) {
					callbackSuccess(response, status, xhr);
				}
			},
			error: function (xhr, status, errorThrown) {
				if (callbackFailure != null) {
					callbackFailure(xhr, status, errorThrown);
				}
			}
		});

	};

	this.callSubmitAjax = function (url, formName, callbackSuccess, callbackFailure) {
		var form = $("#" + formName)[0];
		var formData = new FormData(form);
		$.ajax({
			url: url,
			processData: false,
			contentType: false,
			data: formData,
			type: 'POST',
			async: true,
			beforeSend: function (xmlHttpRequest) {
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			success: function (response, status, xhr) {
				if (callbackSuccess != null) {
					callbackSuccess(response, status, xhr);
				}
			},
			error: function (xhr, status, errorThrown) {
				if (callbackFailure != null) {
					callbackFailure(xhr, status, errorThrown);
				}
			}
		});

	};

	this.callFileSubmitAjax = function (url, formName, callbackSuccess, callbackFailure) {
		var form = $("#" + formName)[0];
		var formData = new FormData(form);
		$.ajax({
			url: url,
			processData: false,
			contentType: false,
			data: formData,
			type: 'POST',
			async: true,
			enctype: 'multipart/form-data',
			beforeSend: function (xmlHttpRequest) {
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			success: function (response, status, xhr) {
				if (callbackSuccess != null) {
					callbackSuccess(response, status, xhr);
				}
			},
			error: function (xhr, status, errorThrown) {
				if (callbackFailure != null) {
					callbackFailure(xhr, status, errorThrown);
				}
			}
		});

	};

	this.callJsonAjax = function (url, jsonData, callbackSuccess, callbackFailure) {
		$.ajax({
			url: url,
			data: JSON.stringify(jsonData),
			dataType: 'json',
			type: 'POST',
			async: true,
			contentType: "application/json;charset=UTF-8",
			beforeSend: function (xmlHttpRequest) {
				xmlHttpRequest.setRequestHeader("AJAX", "true");
			},
			success: function (response, status, xhr) {
				if (callbackSuccess != null) {
					callbackSuccess(response, status, xhr);
				}
			},
			error: function (xhr, status, errorThrown) {
				if (callbackFailure != null) {
					callbackFailure(xhr, status, errorThrown);
				}
			}
		});
	};


	this.parseDate = function (dateStr) {
		if (!/^(\d){8}$/.test(dateStr)) return "invalid date";
		var y = dateStr.substr(0, 4);
		var mm = dateStr.substr(4, 2) - 1;
		var d = dateStr.substr(6, 2);
		return new Date(y, mm, d);
	};

	this.parseTime = function (timeStr) {
		if (!/^(\d){6}$/.test(timeStr)) return "invalid time";
		var h = timeStr.substr(0, 2);
		var m = timeStr.substr(2, 2);
		var s = timeStr.substr(4, 2);
		return new Date(0, 0, 0, h, m, s);
	};
	// 쿠키 등록
	this.setCookie = function (name, value, expires) {
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expires.toGMTString();
	}
	// 쿠키 조회
	this.getCookie = function (Name) {
		var search = Name + "=";

		// 쿠키가 설정되어 있다면
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search);

			// 쿠키가 존재하면
			if (offset != -1) {
				offset += search.length;

				end = document.cookie.indexOf(";", offset);
				// 쿠키 값의 마지막 위치 인덱스 번호 설정
				if (end == -1) {
					end = document.cookie.length;
				}

				return unescape(document.cookie.substring(offset, end));
			}
		}
		return "";
	}

	// 숫자 3자리마다 comma 추가
	this.numComma = function(value){
		var len, point, rtnVal;

		if(value == "" || value == null || value == "undefined"){
			rtnVal = "";
		}else{
			value = value + "";
			point = value.length % 3 ;
			len = value.length;

			rtnVal = value.substring(0, point);
			while (point < len) {
				if (rtnVal != "") rtnVal += ",";
				rtnVal += value.substring(point, point + 3);
				point += 3;
			}
		}

		return rtnVal;
	}
}

this.CommonJS = new CommonClass();

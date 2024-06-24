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
						location.href = "common/login.do";
						return false;
					}
					$("#infoDialog-text").text("ERROR (" + xhr.status + ")" + errorThrown);
					$("#infoDialog").dialog("open");
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
				} else {
					$("#infoDialog-text").text("ERROR (" + xhr.status + ")" + errorThrown);
					$("#infoDialog").dialog("open");
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
				} else {
					$("#infoDialog-text").text("ERROR (" + xhr.status + ")" + errorThrown);
					$("#infoDialog").dialog("open");
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
				} else {
					$("#infoDialog-text").text("ERROR (" + xhr.status + ")" + errorThrown);
					$("#infoDialog").dialog("open");
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
				} else {
					// 세션오류 일 경우 로그인페이지로 이동
					if (xhr.status == "200") {
						location.href = "index.do";
						return false;
					} else {
						$("#infoDialog-text").text("ERROR (" + xhr.status + ")" + errorThrown);
						$("#infoDialog").dialog("open");
					}
				}
			}
		});
	};

	this.setComboData = function (comboId, dispData, optionType, selectedValue) {
		$("#" + comboId).empty();
		if (optionType == "A") {
			$("#" + comboId).append("<option value=\"\">전체</option>");
		} else if (optionType == "S") {
			$("#" + comboId).append("<option value=\"\">선택</option>");
		}

		if (dispData.length > 0) {
			for (var i = 0; i < dispData.length; i++) {
				var selected = "";
				if (typeof (selectedValue) != 'undefined' && selectedValue != '' && selectedValue == dispData[i].cd) {
					selected = 'selected';
				}
				$("#" + comboId).append("<option class=\"ac\" value=\"" + dispData[i].cd + "\"" + selected + ">" + dispData[i].cdNm + "</option>");
			}
		}
	};

	this.setUiComboData = function (comboId, dispData, optionType, selectedValue) {
		$("#" + comboId).empty();
		if (optionType == "A") {
			$("#" + comboId).append("<li value=\"\">전체</li>");
		} else if (optionType == "S") {
			$("#" + comboId).append("<li value=\"\">선택</li>");
		}

		if (dispData.length > 0) {
			for (var i = 0; i < dispData.length; i++) {
				var selected = "";
				if (typeof (selectedValue) != 'undefined' && selectedValue != '' && selectedValue == dispData[i].cd) {
					selected = 'selected';
				}
				$("#" + comboId).append("<li class=\"ac\" value=\"" + dispData[i].cd + "\"" + selected + ">" + dispData[i].cdNm + "</li>");
			}
		}
	};

	this.setComboDataByCode = function (comboId, upperCmmnCode, optionType, selectedValue) {
		this.callAjax(gContextRoot + "/code/getCodeSubList.do", "get", {
			"cmmnCode": upperCmmnCode,
			"useAt":"Y"
		}, function (response) {
			$("#" + comboId).empty();
			if (optionType == "A") {
				$("#" + comboId).append("<option value=\"\">전체</option>");
			} else if (optionType == "S") {
				$("#" + comboId).append("<option value=\"\">선택</option>");
			}

			if (response.Data.length > 0) {
				for (var i = 0; i < response.Data.length; i++) {
					var selected = "";
					if (typeof (selectedValue) != 'undefined' && selectedValue != '' && selectedValue == response.Data[i].cmmnCode) {
						selected = 'selected';
					}
					$("#" + comboId).append("<option value=\"" + response.Data[i].cmmnCode + "\"" + selected + ">" + response.Data[i].cmmnCodeNm + "</option>");
				}
			}
		});
	};

	this.setMultiComboDataByCode = function (selector, upperCmmnCode, optionType, selectedValue) {
		this.callAjax(gContextRoot + "/code/getCodeSubList.do", "get", {
			"cmmnCode": upperCmmnCode,
			"useAt":"Y"
		}, function (response) {
			$(selector).empty();
			if (optionType == "A") {
				$(selector).append("<option value=\"\">전체</option>");
			} else if (optionType == "S") {
				$(selector).append("<option value=\"\">선택</option>");
			}

			if (response.Data.length > 0) {
				for (var i = 0; i < response.Data.length; i++) {
					var selected = "";
					if (typeof (selectedValue) != 'undefined' && selectedValue != '' && selectedValue == response.Data[i].cmmnCode) {
						selected = 'selected';
					}
					$(selector).append("<option value=\"" + response.Data[i].cmmnCode + "\"" + selected + ">" + response.Data[i].cmmnCodeNm + "</option>");
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

	this.pressEnter = function(objectId){
		if(event.keyCode == 13){
			$('#'+objectId).click();
		}
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

	this.checkPassword = function(password){
		var retBool = false;
		// 정규 표현식
		let check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

		// 정규 표현식을 통과하지 못하면
		if(!check.test(password)) {
			retBool = false;
		}else{
			retBool = true;
		}
		return retBool;
	}
}

this.CommonJS = new CommonClass();
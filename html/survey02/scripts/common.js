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

	this.mobileValidatorNoDash = function(args) {
		if (/^[0]{1}[1]{1}[0]{1}[0-9]{4}[0-9]{4}/.test(args)) {
			return true;
		}
		return false;
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

	this.modalPopup = function(obj) {
		/** 2 button function */
		// CommonJS.modalPopup({
		//     title: '제목'         // title 없어도 됨
		//     , msg : 'test'
		//     , objLBtnMsg : '왼쪽버튼'
		//     , objLBtn : function(){alert('왼쪽버튼')}
		//     , objLBtnClass : 'btn_blue'
		//     , objRBtnMsg : '오른쪽버튼'
		//     , objRBtn : function(){alert('왼쪽버튼')}
		//     , objRBtnClass : 'btn_basic'
		// })

		/** 1 button function */
		// CommonJS.modalPopup({
		//     title: '제목'         // title 없어도 됨
		//     , msg : 'test'
		//     , objLBtnMsg : '왼쪽버튼'
		//     , objLBtn : function(){alert('왼쪽버튼')}
		//     , objLBtnClass : 'btn_basic'
		// })

		/** not function */
			// CommonJS.modalPopup({
			//     title: '제목'         // title 없어도 됨
			//     , msg : 'test'
			//     , objDBtnMsg : '왼쪽버튼'
			//     , objDBtnClass : 'btn_basic'
			//     , objCloseAt : false
			// })

		var objTitle = obj.title ? obj.title.replace(/\n/g, '</br>') : '';
		var objMsg = obj.msg ? obj.msg.replace(/\n/g, '</br>') : '';
		var objLBtnMsg = obj.objLBtnMsg ? obj.objLBtnMsg.replace(/\n/g, '</br>') : '';
		var objLBtnClass = obj.objLBtnClass ? obj.objLBtnClass : 'btn_light';
		var objRBtnMsg = obj.objRBtnMsg ? obj.objRBtnMsg.replace(/\n/g, '</br>') : '';
		var objRBtnClass = obj.objRBtnClass ? obj.objRBtnClass : 'btn_light';
		var objDBtnMsg = obj.objDBtnMsg ? obj.objDBtnMsg : '닫기';
		var objDBtnClass = obj.objDBtnClass ? obj.objDBtnClass : 'btn_light';
		/* 팝업 닫힘 여부 추가 */
		/* flase 일 경우 $('body, #commonModalPopup').removeClass('open').removeClass('notClose'); 직접 사용 필수 */
		var objCloseAt = obj.objCloseAt == null ? true : obj.objCloseAt;

		var modalPopupHtml = '';
		modalPopupHtml += '<div class="popup open" id="commonModalPopup">';
		modalPopupHtml += '    <div class="overlay"></div>';
		modalPopupHtml += '    <div class="popup_msg">';
		// 타이틀 영역
		if(objTitle) {
			modalPopupHtml += '        <p class="popup_t">' + objTitle + '</p>';
		}

		// 메세지 영역
		if(objMsg) {
			modalPopupHtml += '        <div class="popup_con">';
			// modalPopupHtml += '            <p class="' + objMsgClass + '">' + objMsg + '<br><br></p>';
			modalPopupHtml += objMsg;
			modalPopupHtml += '        </div>';
		}

		modalPopupHtml += '        <div class="popup_btn">';
		if(objLBtnMsg || objRBtnMsg) {
			if(objLBtnMsg) {
				modalPopupHtml += '            <button class="btn_m ' + objLBtnClass +'" id="commonModalPopupLBtn">' + objLBtnMsg + '</button>';
			}
			if(objRBtnMsg) {
				modalPopupHtml += '            <button class="btn_m ' + objRBtnClass +'" id="commonModalPopupRBtn">' + objRBtnMsg + '</button>';
			}
		} else {
			modalPopupHtml += '            <button class="btn_m ' + objDBtnClass + '" id="commonModalPopupDBtn">' + objDBtnMsg + '</button>';
		}
		modalPopupHtml += '        </div>';
		modalPopupHtml += '    </div>';
		modalPopupHtml += '</div>';

		if($("#commonModalPopup").length >= 1){
			$("#commonModalPopup").remove();
		}
		$(document).find("body").append(modalPopupHtml);
		$('body').addClass('open');

		if(!objCloseAt) {
			$('body').addClass('notClose');
		}

		$('#commonModalPopup').on('click', '#commonModalPopupLBtn', function(){
			if(typeof(obj.objLBtn) === 'function') {
				obj.objLBtn();
			}
			if(objCloseAt) {
				$('#commonModalPopup').removeClass('open');
				$('body').removeClass('open');
			}
		});

		$('#commonModalPopup').on('click', '#commonModalPopupRBtn', function(){
			if(typeof(obj.objRBtn) === 'function') {
				obj.objRBtn();
			}
			if(objCloseAt) {
				$('#commonModalPopup').removeClass('open');
				$('body').removeClass('open');
			}
		});

		$('#commonModalPopup').on('click', '#commonModalPopupDBtn', function(){
			if(objCloseAt) {
				$('#commonModalPopup').removeClass('open');
				$('body').removeClass('open');
			}
		});
	}

	// obj : 팝업 내용
	// addEventObj : 추가 function 타입 [Object] == function
	this.slidePopup = function(obj, addEventObj) {

		/** EX */
			// // 기본형
			// var contentArr = [
			//     {msg : '첫번째 라인', msgClass : 'one'}
			//     , {msg : '두번째 라인', msgClass : 'two'}
			//     , {msg : '세번째 라인', msgClass : 'three'}
			// ];
			// // 리스트형
			// var listContent = ['첫번째','두번째','세번째'];
			//
			// // input 형
			// var inputContent = {
			//     inputType : 'text' // textarea 가능
			//     , inputPlaceholder : 'placeholder'
			//     , inputValue : 'value'
			//     , inputMaxLength : 100
			// };
			// // table 형
			// var tableContentArr = [
			//     {leftMsg : '상담일자', rightMsg : '2023-01-01'}
			//     , {leftMsg : '상담방법', rightMsg : '화상상담'}
			//     , {leftMsg : '담당약사', rightMsg : '약사님'}
			// ];
			//
			// // 이미지형
			// var imgContent = {img : '../../images/common/sample_img.png', sendUrl : 'https://fitamin.kr'};
			//
			// // 이벤트 버튼 추가
			// var eventBtn = {
			//     title : 'event btn'
			//     , btnClass : 'btn_basic'
			//     , action : function(){
			//         $('#commonSlidePopup #slidePopInput').val();   // inputContent Value
			//         $('#commonSlidePopup #slideBtnToast').finish().fadeToggle().fadeToggle(2000);    // toastMsg 사용할 경우
			//         $('body,#commonSlidePopup').removeClass('open'); // 팝업 닫을경우 필수
			//     }
			// }
			//
			// // 기본 버튼 이벤트 추가
			// var defaultBtn = {
			//     title : 'default btn'
			//     , btnClass : 'btn_basic'
			//     , action : function(){
			//         $('#commonSlidePopup #slidePopInput').val();   // inputContent Value
			//         $('#commonSlidePopup #slideBtnToast').finish().fadeToggle().fadeToggle(2000);    // toastMsg 사용할 경우
			//         $('body,#commonSlidePopup').removeClass('open'); // 팝업 닫을경우 필수
			//     }
			// }
			//
			// // 이미지형 일때
			// CommonJS.slidePopup({
			//       imgContent : imgContent       // 이미지형
			//     , eventBtn : eventBtn
			//     , outClose : false
			// })
			//
			// // 이미지형이 아닐때
			// CommonJS.slidePopup({
			//       title: 'Title 역역'
			//     , subTitle : 'subTitle 영역'
			//     , content : contentArr          // 기본형
			//     , listContent : listContent     // 리스트형
			//     , inputContent : inputContent   // input 형
			//     , tableContent : tableContent   // table 형
			//     , eventBtn : eventBtn           // 이벤트 버튼 생성
			//     , defaultBtn : defaultBtn       // 기본 닫기 버튼
			//     , toastMsg : '5글자 이상 입력해 주세요.'   // 토스트 메세지
			//     , outClose : true               // 팝업 외부 클릭 시 close 이벤트
			//     , contentClass : 'bg_gray'      // 콘텐츠 배경색을 위해 class 추가
			// })

		var objTitle = obj.title ? obj.title.replace(/\n/g, '</br>') : '';
		var objSubTitle = obj.subTitle ? obj.subTitle.replace(/\n/g, '</br>') : '';

		var objContent = obj.content ? obj.content : '';            // 기본형
		var objListContent = obj.listContent ? obj.listContent : '';            // ul
		var objInputContent = obj.inputContent ? obj.inputContent : '';            // input
		var objImgContent = obj.imgContent ? obj.imgContent : '';
		var objTableContent = obj.tableContent ? obj.tableContent : '';
		var objFreeContent = obj.freeContent ? obj.freeContent : '';
		var objBtnWrapClass = obj.btnWrapClass ? obj.btnWrapClass : '';


		var objToastMsg = obj.toastMsg ? obj.toastMsg.replace(/\n/g, '</br>') : '';
		var objBottomToastMsg = obj.bottomToastMsg ? obj.bottomToastMsg.replace(/\n/g, '</br>') : '';
		var objEventBtn = obj.eventBtn ? obj.eventBtn : '';
		var objDefaultBtn = obj.defaultBtn ? obj.defaultBtn : '';
		var objOutCloseEvent = obj.outClose ? obj.outClose : false;     // 팝업 외부 클릭 시 닫기
		var objOutCloseFn = obj.outCloseFn ? obj.outCloseFn : '';       // 팝업 외부 클릭 시 이벤트
		var objContentClass = obj.contentClass ? obj.contentClass : '';     // 팝업 외부 클릭 시 닫기
		var objOverlayAnimation = obj.overlayAnimation ? obj.overlayAnimation : '';

		var slidePopupHtml = '';

		slidePopupHtml += '<div class="modal" id="commonSlidePopup">';
		slidePopupHtml += '    <div class="overlay"></div>';

		if(objOverlayAnimation) {
			slidePopupHtml += objOverlayAnimation;
		}

		slidePopupHtml += '    <div class="modal_block">';

		if(objImgContent && objImgContent.img) {

			slidePopupHtml += '<div class="modal_img">';
			slidePopupHtml += '    <a href="' + (objImgContent.sendUrl ? objImgContent.sendUrl : 'javascript:void(0);') + '">';
			slidePopupHtml += '        <img src="' + objImgContent.img + '" alt="">';
			slidePopupHtml += '    </a>';
			slidePopupHtml += '</div>';

		} else if(objFreeContent) {
			if(objToastMsg) {
				slidePopupHtml += '            <p class="toast" id="slideBtnToast" style="display: none;">' + objToastMsg + '</p>';
			}
			slidePopupHtml += objFreeContent;
		} else {
			if(objToastMsg) {
				slidePopupHtml += '            <p class="toast" id="slideBtnToast" style="display: none;">' + objToastMsg + '</p>';
			}
			slidePopupHtml += '        <div class="modal_in">';
			slidePopupHtml += '            <div class="modal_top">';
			slidePopupHtml += '                <p class="modal_t">' + objTitle + '</p>';
			slidePopupHtml += '                <p class="modal_sub">' + objSubTitle + '</p>';
			slidePopupHtml += '            </div>';
			slidePopupHtml += '            <div class="modal_con ' + objContentClass + '">';
			// 1.기본 텍스트 영역
			if(objListContent) {
				slidePopupHtml += '                 <ul>';
				objListContent.forEach(function(content){
					slidePopupHtml += '<li>' + content.replace(/\n/g, '</br>') + '</li>';
				})
				slidePopupHtml += '                 </ul>';

			} else if(objInputContent) {
				var inputType = objInputContent.inputType ? objInputContent.inputType : 'text';
				var inputPlaceholder = objInputContent.inputPlaceholder ? objInputContent.inputPlaceholder : '';
				var inputValue = objInputContent.inputValue ? objInputContent.inputValue : '';
				var inputMaxLength = objInputContent.inputMaxLength ? objInputContent.inputMaxLength : 100;

				if(inputType == 'textarea') {
					slidePopupHtml += '<div class="textarea_block">';
					slidePopupHtml += '    <textarea id="slidePopInput" placeholder="' + inputPlaceholder + '" value="' + inputValue + '" maxlength="' + inputMaxLength + '" style="resize: none;" cols="30" rows="5"></textarea>';
				} else {
					slidePopupHtml += '<div class="input_basic">';
					slidePopupHtml += '    <input type="' + inputType + '" id="slidePopInput" placeholder="' + inputPlaceholder + '" value="' + inputValue + '" maxlength="' + inputMaxLength + '">';
				}
				slidePopupHtml += '</div>';
			} else if(objContent) {
				objContent.forEach(function(content){
					slidePopupHtml += '            <p class="span2_f ' + content.msgClass + '">' + content.msg.replace(/\n/g, '</br>') + '</p>';
				})
			} else if(objTableContent) {
				slidePopupHtml += '            <div class="cardround_b bg_gray">';
				objTableContent.forEach(function(tableContent) {
					slidePopupHtml += '            <div class="info_table">';
					slidePopupHtml += '            <p class="table_l">' + tableContent.leftMsg + '</p>';
					slidePopupHtml += '            <p class="table_r">' + tableContent.rightMsg + '</p>';
					slidePopupHtml += '            </div>';
				})
				slidePopupHtml += '            </div>';
			}
			slidePopupHtml += '            </div>';
			if(objInputContent && objInputContent.inputInfo) {
				slidePopupHtml += '<p class="slide_input_info">' + objInputContent.inputInfo + '</p>';
			}
			slidePopupHtml += '        </div>';
		}
		if(objBtnWrapClass) {
			slidePopupHtml += '        <div class="btn_wrap ' + objBtnWrapClass + '">';
		} else {
			slidePopupHtml += '        <div class="btn_wrap">';
		}

		if(objBottomToastMsg) {
			slidePopupHtml += '            <p class="toast" id="slideBottomBtnToastBottom" style="display: none;">' + objBottomToastMsg + '</p>';
		}
		if(objEventBtn) {
			if(objEventBtn.length) {
				objEventBtn.forEach(function (eventBtn, index) {
					slidePopupHtml += '            <button class="btn_b ' + (eventBtn.btnClass ? eventBtn.btnClass : 'btn_basic') + '" id="slidePopActionBtn' + index + '">';
					slidePopupHtml += eventBtn.title;
					slidePopupHtml += '            </button>';
				});
			} else {
				slidePopupHtml += '            <button class="btn_b ' + (objEventBtn.btnClass ? objEventBtn.btnClass : 'btn_basic') + '" id="slidePopActionBtn">';
				slidePopupHtml += objEventBtn.title;
				slidePopupHtml += '            </button>';
			}
		}
		if(objDefaultBtn) {
			slidePopupHtml += '            <button class="btn_b ' + (objDefaultBtn.btnClass ? objDefaultBtn.btnClass : 'btn_trans') + '" id="slidePopCloseBtn">';
			slidePopupHtml += objDefaultBtn.title ? objDefaultBtn.title : '닫기';
			slidePopupHtml += '            </button>';
		} else {
			slidePopupHtml += '            <button class="btn_b btn_trans" id="slidePopCloseBtn">닫기</button>';
		}
		slidePopupHtml += '        </div>';
		slidePopupHtml += '        </div>';
		slidePopupHtml += '</div>';

		if($("#commonSlidePopup").length >= 1){
			$("#commonSlidePopup").remove();
		}
		$(document).find("body").append(slidePopupHtml);

		if(objEventBtn) {
			if(objEventBtn.length) {
				objEventBtn.forEach(function (eventBtn, index) {
					$('#commonSlidePopup').on('click', '#slidePopActionBtn' + index, function(){
						if(typeof(eventBtn.action) === 'function') {
							eventBtn.action();
						} else {
							$('body,#commonSlidePopup').addClass('open');
						}
					});
				})
			} else {
				$('#commonSlidePopup').on('click', '#slidePopActionBtn', function(){
					if(typeof(objEventBtn.action) === 'function') {
						objEventBtn.action();
					} else {
						$('body,#commonSlidePopup').addClass('open');
					}
				});
			}
		}


		$('#commonSlidePopup').on('click', '#slidePopCloseBtn', function(){
			if(objDefaultBtn && typeof(objDefaultBtn.action) === 'function') {
				objDefaultBtn.action();
			} else {
				$('body,#commonSlidePopup').addClass('open');
			}
		});

		if(objOutCloseEvent) {
			$('#commonSlidePopup .overlay, .btnClose').on('click', function(){
				if(objOutCloseFn && typeof(objOutCloseFn) === 'function') {
					objOutCloseFn();
				}

				$('#commonSlidePopup, body').removeClass("open");
			});
		}

		if(addEventObj && typeof(addEventObj) === 'function') {
			addEventObj();
		}

		// setTimeout 안하면 슬라이드처럼 보이지 않음.
		setTimeout(function (){
			$('body,#commonSlidePopup').addClass('open');
		},0.1);
	}

	this.footerToastPopup = function(toastMsg, delay, completeHandler,topValue) {
		let toastPopupHtml = '';
		toastPopupHtml += '<div class="btn_fix" id="commonToastPopup">';
		toastPopupHtml += '    <p class="toast">' + toastMsg + '</p>';
		toastPopupHtml += '</div>';

		if($("#commonToastPopup").length >= 1){
			$("#commonToastPopup").remove();
		}
		$(document).find("body").append(toastPopupHtml);
		if(topValue) {
			$('#commonToastPopup').css('bottom', ($('body').offset().top + $('body').height() - topValue) + 'px')
		}

		let toastDelay = 3000;
		if (delay && !isNaN(parseInt(delay))) {
			toastDelay = parseInt(delay);
		}

		$('#commonToastPopup').fadeOut(toastDelay);
		if (completeHandler && typeof(completeHandler) === 'function') {
			setTimeout(function() {
				completeHandler();
			}, toastDelay);
		}
	}

	this.goHistoryBack = function (index = -1){
		if (history.length < (1 + Math.abs(index))) {
			CommonJS.sendReplaceUrl('/main/index.do');
		} else {
			history.go(index);
		}
	};

	this.numberWithComma = function(number) {
		let n = parseInt(number);
		if (!n) { n = 0; }
		return n.toLocaleString('en-US');
	};

	this.getDayOfWeek = function (val){ //ex) getDayOfWeek('2022-06-13')

		const week = ['일', '월', '화', '수', '목', '금', '토'];
		const dayOfWeek = week[new Date(val).getDay()];
		return dayOfWeek;
	}

	/**
	 * 좌측문자열채우기
	 * @params
	 *  - str : 원 문자열
	 *  - padLen : 최대 채우고자 하는 길이
	 *  - padStr : 채우고자하는 문자(char)
	 */
	this.lpad = function (str, padLen, padStr) {
		if (padStr.length > padLen) {
			console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
			return str;
		}
		str += ""; // 문자로
		padStr += ""; // 문자로
		while (str.length < padLen)
			str = padStr + str;
		str = str.length >= padLen ? str.substring(0, padLen) : str;
		return str;
	}

	/**
	 * 우측문자열채우기
	 * @params
	 *  - str : 원 문자열
	 *  - padLen : 최대 채우고자 하는 길이
	 *  - padStr : 채우고자하는 문자(char)
	 */
	this.rpad = function(str, padLen, padStr) {
		if (padStr.length > padLen) {
			console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
			return str + "";
		}
		str += ""; // 문자로
		padStr += ""; // 문자로
		while (str.length < padLen)
			str += padStr;
		str = str.length >= padLen ? str.substring(0, padLen) : str;
		return str;
	}
}

this.CommonJS = new CommonClass();
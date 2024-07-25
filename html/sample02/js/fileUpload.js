(function ($) {
  var fileUploadCount = 0;

  $.fn.fileUpload = function () {
    return this.each(function () {
      var fileUploadDiv = $(this);
      var fileUploadId = `fileUpload-${++fileUploadCount}`;

      // Creates HTML content for the file upload area.
      var fileDivContent = `
            <label for="${fileUploadId}" class="file-upload">
                <div class="avatar type_rounded">
                    <p class="thumb"><i class="ic_upload_gr avatar_icon"></i></p>
                </div>

                <p class="font_h4">Drag and drop your image here</p>
                <p class="text_disabled">or</p>
                <button class="btn type_label size_s">
                    <div class="ripple js-ripple">
                        <span class="ripple__circle"></span>
                    </div>
                    Browse Image
                </button>

                <input type="file" id="${fileUploadId}" name=[] multiple hidden />
            </label>
            `;

      fileUploadDiv.html(fileDivContent).addClass("file-container");

      var table = null;
      var tableBody = null;
      // Creates a table containing file information.
      function createTable() {
        table = $(`
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th style="width: 30%;">File Name</th>
                                <th>Preview</th>
                                <th style="width: 20%;">Size</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                `);

        tableBody = table.find("tbody");
        fileUploadDiv.append(table);
      }

      // Adds the information of uploaded files to table.
      function handleFiles(files) {
        if (!table) {
          createTable();
        }

        tableBody.empty();
        if (files.length > 0) {
          $.each(files, function (index, file) {
            var fileName = file.name;
            var fileSize = (file.size / 1024).toFixed(2) + " KB";
            var fileType = file.type;
            var preview = fileType.startsWith("image")
              ? `<img src="${URL.createObjectURL(
                  file
                )}" alt="${fileName}" height="30">`
              : `<i class="ic_file"></i>`;

            tableBody.append(`
                            <tr>
                                <td>${index + 1}</td>
                                <td>${fileName}</td>
                                <td>${preview}</td>
                                <td>${fileSize}</td>
                                <td>${fileType}</td>
                                <td><button class="btn size_s type_basic color_error deleteBtn"><i class="ic_x_w"></i></button></td>
                            </tr>
                        `);
          });

          tableBody.find(".deleteBtn").click(function () {
            $(this).closest("tr").remove();

            if (tableBody.find("tr").length === 0) {
              tableBody.append(
                '<tr><td colspan="6" class="no-file text_center">No files selected!</td></tr>'
              );
            }
          });
        }
      }

      // Events triggered after dragging files.
      fileUploadDiv.on({
        dragover: function (e) {
          e.preventDefault();
          fileUploadDiv.toggleClass("dragover", e.type === "dragover");
        },
        drop: function (e) {
          e.preventDefault();
          fileUploadDiv.removeClass("dragover");
          handleFiles(e.originalEvent.dataTransfer.files);
        },
      });

      // Event triggered when file is selected.
      fileUploadDiv.find(`#${fileUploadId}`).change(function () {
        handleFiles(this.files);
      });
    });
  };
})(jQuery);

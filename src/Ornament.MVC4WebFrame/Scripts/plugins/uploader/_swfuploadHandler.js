/* Demo Note:  This demo uses a FileProgress class that handles the UI for displaying the file name and percent complete.
The FileProgress class is not part of SWFUpload.
*/


/* **********************
Event Handlers
These are my custom event handlers to make my
web application behave the way I went when SWFUpload
completes different tasks.  These aren't part of the SWFUpload
package.  They are part of my application.  Without these none
of the actions SWFUpload makes will show up in my application.
********************** */
function fileQueued(file) {
    $("#pending").tmpl({ fileId: file.id, fileName: file.name }).appendTo($(this.customSettings.progressTarget));
}
function showError(file, message) {
    $("#" + file.id).addClass("alert-warning").remove("alert-info").next().text(message);
}
function fileQueueError(file, errorCode, message) {
    console.log("fileQueueError;");
    if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
        showError(file, "You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
        return;
    }
    switch (errorCode) {
        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
            // alert("File is too big.");
            showError(file, "Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            //alert("Cannot upload Zero Byte files.");
            showError(file, "Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
            //alert("Invalid File Type.");
            showError(file, "Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        default:
            if (file !== null) {
                showError(file, "Unhandled Error");
            }
            showError(file, "Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
    }

}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    console.log("fileDialogComplete;");
    try {
        /* I want auto start the upload and I can do that here */
        if (numFilesQueued > 0) {
            this.startUpload();
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadStart(file) {
    $("#" + file.id).addClass("alert-info");
    return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
    console.log("uploadProgress");
    try {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

        /*var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setProgress(percent);
        alert("Uploading...");*/
        $(".bar", $("#" + file.id)).css("width", percent + "%");
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccess(file, serverData) {
    try {
        console.log("uploadSuccess");
        /*var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setComplete();
        alert("Complete.");
        progress.toggleCancel(false);*/
        var a = $("#" + file.id).addClass("alert-success").removeClass("alert-info");
        setTimeout(function() {
            a.fadeOut();
        }, 1000);


    } catch (ex) {
        this.debug(ex);
    }
}

function uploadError(file, errorCode, message) {
    try {
        console.log("error!!!!");
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                //alert("Upload Error: " + message);
                showError(file, "Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                //alert("Upload Failed.");
                showError(file, "Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                //alert("Server (IO) Error");
                showError(file, "Error Code: IO Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                //alert("Security Error");
                showError(file, "Error Code: Security Error, File name: " + file.name + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                //alert("Upload limit exceeded.");
                showError(file, "Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                //alert("Failed Validation.  Upload skipped.");
                showError(file, "Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                // If there aren't any files left (they were all cancelled) disable the cancel button
                if (this.getStats().files_queued === 0) {
                    document.getElementById(this.customSettings.cancelButtonId).disabled = true;
                }
                //alert("Cancelled");
                //progress.setCancelled();
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                //alert("Stopped");
                break;
            default:
                //alert("Unhandled Error: " + errorCode);
                showError(file, "Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
                break;
        }
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
    /*if (this.getStats().files_queued === 0) {
    document.getElementById(this.customSettings.cancelButtonId).disabled = true;
    }*/
    console.log("uploadComplete," + file.id + " last " + this.getStats().files_queued);
    if (this.getStats().files_queued > 0) {
        this.startUpload();
    } else {

    }
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
    console.log("queueComplete!!!!");
    var status = document.getElementById("divStatus");
    status.innerHTML = numFilesUploaded + " file" + (numFilesUploaded === 1 ? "" : "s") + " uploaded.";
}
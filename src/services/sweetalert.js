/*  sweetalert  */
import swal from 'sweetalert2';

const SweetAlert =  {
    swal: function () {
        return swal.apply(swal, arguments);
    },
    alert: function (title, message, type,opt) {
        return swal(Object.assign({
            title: title,
            text: message,
            type: type,
            confirmButtonText: '确定',
            width: '300px',
            showCancelButton: false,
            showLoaderOnConfirm: true,
            allowOutsideClick: false
        },opt|| {})).catch(function (e) {
            //console.log(e);
        });
    },
    success: function (title, message) {
        return this.alert(title, message, 'success',{
            timer: '1500',
            showConfirmButton: false
        });
    },
    error: function (title, message) {
        return this.alert(title, message, 'error');
    },
    warning: function (title, message) {
        return this.alert(title, message, 'warning');
    },
    info: function (title, message) {
        return this.alert(title, message, 'info');
    },
    close: function () {
        return window.alert.close();
    }
};
export default SweetAlert;
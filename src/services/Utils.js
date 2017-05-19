const Utils = {
    getFileType(item){
        //判断是否是图片
        var strFilter = ['jpeg', 'gif', 'jpg', 'png', 'bmp', 'pic'],
            strPostfix;
        if (!item) {
            return null
        }
        if (item.indexOf('.') > -1) {
            strPostfix = item.split('.').pop().toLowerCase();
            if (~strFilter.indexOf(strPostfix)) {
                return 'image';
            } else if (~['pdf'].indexOf(strPostfix)) {
                return 'pdf';
            } else {
                return 'file';
            }
        }
        return null;
    }
};
export default  Utils;
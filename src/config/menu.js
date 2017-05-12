const MENU = [{
    name: "首页",
    icon: "icon-daohang-shouye",
    state: "home",
    son: []
}, {
    name: "企业信息",
    icon: "icon-daohang-shouye",
    //state: "supplier",
    son: [
        {
            name: '列表',
            state: 'table'
        },
        {
            name: '图片上传',
            state: 'imgUpload'
        }
    ]
}];
export default MENU;

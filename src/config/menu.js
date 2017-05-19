const MENU = [{
    name: "首页",
    icon: "ios-paper",
    state: "home"
}, {
    name: "企业信息",
    icon: "ios-paper",
    //state: "supplier",
    son: [
        {
            name: '列表',
            state: 'table'
        },
        {
            name: '图片上传demo',
            state: 'File'
        }
    ]
}];
export default MENU;

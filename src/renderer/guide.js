//guide.js
const steps = [
    {
        element: " #driver-set-1",
        popover: {
            title: "文件保存路径",
            description: "修复后的文件所在位置",
            position: "auto"
        }
    },
    {
        element: "#driver-set-2",
        popover: {
            title: "软件版本",
            description: "工具迭代以此为记录版本号",
            position: "mid-center"
        },
        padding: 5
    },
    {
        element: "#driver-set-3",
        popover: {
            title: "修复库",
            description: "目前没有对应修复库版本",
            position: "bottom"
        }
    },
    {
        element: "#driver-set-4",
        popover: {
            title: "文件格式",
            description: "选中后所有操作的文件都已此格式为基准",
            position: "bottom"
        }
    },
    {
        element: "#tagsView",
        popover: {
            title: "最近打开任务",
            description: "最近打开任务菜单，点击可快速切换",
            position: "bottom"
        }
    }
]

export default steps

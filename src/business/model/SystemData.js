class SystemData {
    constructor(props) {
        this.info = props || {
            isHomeLoaded: false,
        };
    }

    setInfo(data = {}) {
        // 首页是否加载完成
        let isHomeLoaded = this.info.isHomeLoaded;
        if (typeof data.isHomeLoaded !== 'undefined') {
            isHomeLoaded = data.isHomeLoaded;
        }

        this.info = Object.assign(this.info, {
            ...data,
            isHomeLoaded,
        });
    }

    getInfo() {
        return this.info;
    }
}

export default new SystemData();

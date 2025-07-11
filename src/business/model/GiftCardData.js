class GiftCardData {
    constructor(props) {
        this.info = props || {};
    }

    setInfo(data = {}) {
        this.info = Object.assign(this.info, {
            ...data,
        });
    }

    getInfo() {
        return this.info;
    }

    /**
     * 保存所有的礼品卡列表数据
     * @param {*} list
     */
    saveList(list) {
        this.setInfo({ list });
    }

    /**
     * 获得所有的卡种类列表
     */
    getCategoryList() {
        const categoryList = [];
        this.info.list &&
            this.info.list.map(item => {
                // // 临时代码：目前没有卡头信息，先临时构造后续删除
                // if (item.name.indexOf('iTunes') !== -1) {
                //     item.card_heads = [
                //         {
                //             id: 1,
                //             country_id: 1,
                //             head_num: 1,
                //         },
                //         {
                //             id: 2,
                //             country_id: 1,
                //             head_num: 2,
                //         },
                //         {
                //             id: 3,
                //             country_id: 1,
                //             head_num: 3,
                //         },
                //         {
                //             id: 4,
                //             country_id: 1,
                //             head_num: 4,
                //         },
                //     ];
                // }

                categoryList.push({
                    card_type_id: item.card_type_id,
                    name: item.name,
                    card_heads: item.card_heads,
                    url: item.public_url,
                    is_disabled: item?.is_disabled || false,
                });
            });
        return categoryList;
    }

    /**
     * 根据卡种id获得对应卡种下的关联信息
     * @param {*} card_type_id
     */
    getGiftCardInfoByCategoryId(card_type_id) {
        return this.info.list.find(item => item.card_type_id === card_type_id);
    }
}

export default new GiftCardData();

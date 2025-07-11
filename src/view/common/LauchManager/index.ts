import { CommonController } from '@business/controller';
import { CountryStorage, UserStorage } from '@business/storage';
import { CommonStore } from '@lib/zustand';
import UserStore from '@lib/zustand/UserStore';

/**
 *初始化启动时需要预加载的数据
 */
export const initLauchData = async () => {
    //用户信息
    const userInfo = await UserStorage.getInfo();
    UserStore.getState().setCurrency(userInfo.currency);
    UserStore.getState().setUserInfo(userInfo);

    //国家信息
    const countryList = (await CountryStorage.getInfo()) ?? [];
    if (countryList?.length > 0) {
        const dictCountry = countryList.filter((v: { name: string }) => v.name == 'NG')[0];
        CommonStore.getState().setDefaultCountryData(dictCountry);
    }
    //设置默认值
    CommonStore.getState().setCountryList(countryList);

    await CommonController.getCountryList();
};

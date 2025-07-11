// 函数写法
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@common/CommonStyle';
import TextInner from '@components/TextInner';
import CommonMethods from '@utils/CommonMethods';
import CommonController from '@business/controller/CommonController';
import Hud from '@components/Hud';
import { ghanaPhoneRegex, kenyaPhoneRegex, nigeriaPhoneRegex } from '@utils/RegularUtil';
import { useTranslation } from 'react-i18next';

interface Props {
    phoneNum?: string; //电话号码
    country_id?: number; //国家ID
    type?: number; //短信类型
}

export default ({ phoneNum, country_id, type }: Props) => {
    const { t } = useTranslation();
    const [time, setTime] = useState(60);

    let interval: any;

    const startInterVal = () => {
        let count = 60;
        interval = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                setTime(60);
                clearInterval(interval);
            } else {
                setTime(count);
            }
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(interval);
        };
    }, []);

    const getDatas = async () => {
        if (!phoneNum) {
            return CommonMethods.verifyFormWithKey('phoneNum');
        }
        if (!country_id) {
            return CommonMethods.verifyFormWithKey('country');
        }
        if (country_id == 1 && nigeriaPhoneRegex(phoneNum)) {
            return CommonMethods.verifyFormWithKey('correct');
        }
        if (country_id == 2 && ghanaPhoneRegex(phoneNum)) {
            return CommonMethods.verifyFormWithKey('correct');
        }
        if (country_id == 3 && kenyaPhoneRegex(phoneNum)) {
            return CommonMethods.verifyFormWithKey('correct');
        }
        let newPhoneNum = phoneNum;
        if (phoneNum.charAt(0) == '0') {
            newPhoneNum = phoneNum.substring(1);
        }
        Hud.show();
        const success = await CommonController.sendCode({
            numbers: [newPhoneNum],
            country_id,
            type,
        });
        Hud.hide();
        if (success) {
            startInterVal();
        }
    };

    return (
        // <View style={{  backgroundColor: '#fff' }}>
        <TouchableOpacity
            activeOpacity={time == 60 ? 0.5 : 1}
            onPress={() => {
                if (time == 60) {
                    CommonMethods.noDoubleClick(() => {
                        getDatas();
                    }, 1000);
                }
            }}
        >
            <TextInner style={{ color: time == 60 ? COLORS.link : COLORS.primary }}>
                {time == 60 ? t('send') : `${time}s`}
            </TextInner>
        </TouchableOpacity>
        // </View>
    );
};

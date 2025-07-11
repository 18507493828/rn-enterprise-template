import { CommonController } from '@business/controller';
import { showForceUpdateModal } from '@components/ForceUpdate';
import { LOGI } from '@jssdk/lib/Logger';
import { handleError } from '@utils/ErrorUtil';
import DeviceInfo from 'react-native-device-info';
const TAG = 'checkAppUpdate';

export const checkAppUpdate = async () => {
    const currentVersion = DeviceInfo.getVersion();
    const data: any = await CommonController.globalConfigs();
    const minimumSupportedVersion = data?.minimumSupportedVersion ?? '';
    LOGI(
        TAG,
        `currentVersion:${currentVersion},minimumSupportedVersion:${minimumSupportedVersion}`,
    );
    const isForce = compareVersions(currentVersion, minimumSupportedVersion) < 0;
    isForce ? handleForceUpdate() : handleOptionalUpdate();
};

// 强制更新
const handleForceUpdate = () => {
    showForceUpdateModal();
};

// 可选更新，暂时不做处理。
const handleOptionalUpdate = () => {};

// 比较版本号，是否需要强制更新
const compareVersions = (current: string, target: string): number => {
    const parse = (version: string) => version.split('.').map(Number);
    const [curMajor, curMinor, curPatch] = parse(current);
    const [tgtMajor, tgtMinor, tgtPatch] = parse(target);

    if (curMajor !== tgtMajor) return curMajor - tgtMajor;
    if (curMinor !== tgtMinor) return curMinor - tgtMinor;
    return curPatch - tgtPatch;
};

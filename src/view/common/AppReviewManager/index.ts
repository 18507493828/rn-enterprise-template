import InAppReview from 'react-native-in-app-review';

//评分初始化
export const AppReview = () => {
    InAppReview.isAvailable();
    InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully: any) => {
            if (hasFlowFinishedSuccessfully) {
            }
        })
        .catch((error: any) => {
            console.log(error);
        });
};

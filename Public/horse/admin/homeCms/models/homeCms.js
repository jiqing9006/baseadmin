/**
 * Created by lvliqi on 2017/6/23.
 */
import HomeCmsApi from '../service/homeCms'

export default {
    namespace: 'homeCms',
    state: {
        cms: []
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload}
        }
    },
    effects: {
        *init(_, {put}){
            let cms = yield HomeCmsApi.getHomeCMS();
            cms = cms.data;


            try {
                cms = JSON.parse(cms);
            } catch (e) {
                console.error(e);
                cms = [];
            }

            yield put({type: 'payload', payload: {cms}});
        },
        *setData(_, {put, select}){
            let {cms} = yield select(({homeCms}) => homeCms);
            HomeCmsApi.setHomeCMS({data: JSON.stringify(cms)});
            alert('保存成功');
        }
    }
}
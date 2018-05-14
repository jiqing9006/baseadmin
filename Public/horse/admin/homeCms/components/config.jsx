import PinPaiQiangWiget from './widget/PinPaiQiang'
import PinPaiQiangComponent from './components/PinPaiQiang'
import IconWiget from './widget/Icon'
import IconComponent from './components/Icon'
import HengXiangAD from './widget/HengXiangAD'
import HengXiangADComponent from './components/HengXiangAD'
import DanTiaoAD from './widget/DanTiaoAD'
import DanTiaoADComponent from './components/DanTiaoAD'
import SiGeAD from './widget/SiGeAD'
import SiGeADComponent from './components/SiGeAD'
import QiangGou from './widget/QiangGou'
import PicSpecial from './widget/PicSpecial'
import PicSpecialComponent from './components/PicSpecial'
import NewsSpecial from './widget/NewsSpecial'
import NewsSpecialComponent from './components/NewsSpecial'
import GoodSpecial from './widget/GoodSpecial'
import GoodSpecialComponent from './components/GoodSpecial'
import MallInfoWidget from './widget/MallInfo'
import MallInfoComponent from './components/MallInfo'


export default {
    'mallinfo': {
        widget: MallInfoWidget,
        component: MallInfoComponent
    },
    'icon': {
        widget: IconWiget,
        component: IconComponent
    },
    'pinpaiqiang': {
        widget: PinPaiQiangWiget,
        component: PinPaiQiangComponent
    },
    'hengxiangad': {
        widget: HengXiangAD,
        component: HengXiangADComponent
    },
    'dantiaoad': {
        widget: DanTiaoAD,
        component: DanTiaoADComponent
    },
    'sigead': {
        widget: SiGeAD,
        component: SiGeADComponent
    },
    'qianggou': {
        widget: QiangGou,
        component: SiGeADComponent
    },
    'picspecial': {
        widget: PicSpecial,
        component: PicSpecialComponent
    },
    'newsspecial': {
        widget: NewsSpecial,
        component: NewsSpecialComponent
    },
    'goodspecial': {
        widget: GoodSpecial,
        component: GoodSpecialComponent
    }
}
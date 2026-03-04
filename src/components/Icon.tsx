import { createIconSet, createIconSetFromIcoMoon } from "@expo/vector-icons"
import { useFonts } from 'expo-font'
import { JSX } from "react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
import fontData from '../../assets/fonts/icomoon.ttf'
import fontSelection from '../../assets/fonts/selection.json'


// IcoMoonで生成したフォントを使うための変数
const CustomIcon = createIconSetFromIcoMoon(
    fontSelection,
    'IcoMoon',
    'icomoon.ttf'
)

interface Props {
    name: string
    size: number
    color: string
}

// コンポーネントとして使うファンクショナルコンポーネント
const Icon = (props: Props): JSX.Element | null => {

    const {name, size, color} = props
    // useFontsでfontDataが読み込まれるかどうかをチェック
    const [ fontLoaded ] = useFonts({
        IcoMoon: fontData
    })

    if( !fontLoaded ) {
        return null
    }

    return (
        <CustomIcon name={name} size={size} color={color} />
    )
}

export default Icon
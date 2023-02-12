import { BackButton, BackIcon, Container, Logo } from "./styles";

import imgLogo from '@assets/logo.png'
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
    showBackButton?: boolean
}


export function Header({
    showBackButton = false
}: HeaderProps) {
    const navigation = useNavigation()

    function handleGoBack(){
        navigation.navigate('group')
    }


    return (
        <Container>
            {showBackButton && (
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            )}
            <Logo source={imgLogo} />
        </Container>
    )
}
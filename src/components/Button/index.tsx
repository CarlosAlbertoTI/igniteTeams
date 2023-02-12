import { ButtonTypeStyleProps, Container, Title } from "./styles"
import { TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
    title: string,
    type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY',...rest}: ButtonProps) {
    return (
        <Container
            type={type}
            {...rest}
            
        >
            <Title>
                {title}
            </Title>
        </Container>
    )
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Groups } from "@screens/groups";
import { Players } from "@screens/Players";
import { NewGroup } from "@screens/NewGroup";

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator 
        initialRouteName="group"
        screenOptions={{headerShown:false}}        
        >
            <Screen
                name="group"
                component={Groups}
            />
            <Screen
                name="new"
                component={NewGroup}
            />
            <Screen
                name="players"
                component={Players}
            />
        </Navigator>
    )
}
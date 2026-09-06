import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Home as HomeIcon, User, SquareMenu, Astroid, Book } from 'lucide-react-native';
import { COLORS } from '../styles/theme';
import Home from '../screens/subject/Home';
import Chat from '../screens/chat/Chat';
import Quiz from '../screens/quiz/Quiz';
import Account from '../screens/auth/Account';
import ListFlashcard from '../screens/flashcard/ListFlashcard';
import { useContext } from 'react';
import { MyUserContext } from '../utils/MyContexts';

const Tab = createBottomTabNavigator();
const TabIcon = ({ IconComponent, focused, color, size }) => {
    return (
        <View style={{
            backgroundColor: focused ? COLORS.avatarBg : 'transparent',
            paddingHorizontal: 16,
            paddingVertical: 4,
            borderRadius: 20,
        }}>
            <IconComponent color={focused ? COLORS.primary : color} size={size} />
        </View>
    );
};

const TabNavigation = () => {
    const [user,]=useContext(MyUserContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.subText,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    position: 'absolute',
                    borderRadius: 24,
                    borderTopRightRadius: 24,
                    elevation: 10,
                    shadowColor: COLORS.shadow,
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 8,
                    margin: 10,
                    borderTopWidth: 0,
                },
            }}
        >
            <Tab.Screen
                name="HomeMain"
                component={Home}
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: (props) => <TabIcon IconComponent={HomeIcon} {...props} />,
                }}
            />

            
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    title: 'Hỏi đáp',
                    tabBarIcon: (props) => <TabIcon IconComponent={Astroid} {...props} />,
                }}
            />

            <Tab.Screen
                name="ListFlashcard"
                component={ListFlashcard}
                options={{
                    title: 'Flashcard',
                    tabBarIcon: (props) => <TabIcon IconComponent={Book} {...props} />,

                }}
            />

            <Tab.Screen
                name="Quiz"
                component={Quiz}
                options={{
                    title: 'Trắc nghiệm',
                    tabBarIcon: (props) => <TabIcon IconComponent={SquareMenu} {...props} />,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Account}
                options={{
                    title: 'Tài khoản',
                    tabBarIcon: (props) => <TabIcon IconComponent={User} {...props} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
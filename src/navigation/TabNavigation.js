import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Home as HomeIcon, User, SquareMenu, Astroid } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import Home from '../screens/subject/Home';
import Chat from '../screens/chat/Chat';
import Quiz from '../screens/quiz/Quiz';
import Account from '../screens/auth/Account';

const Tab = createBottomTabNavigator();
const TabIcon = ({ IconComponent, focused, color, size }) => {
    return (
        <View style={{
            backgroundColor: focused ? 'blue' : 'transparent',
            paddingHorizontal: 16,
            paddingVertical: 4,
            borderRadius: 20, // Bo tròn dạng viên thuốc (Pill shape)
        }}>
            <IconComponent color={focused ? "white" : color} size={size} />
        </View>
    );
};

const TabNavigation = () => {
    // const unreadCount = useContext(NotificationContext);
    const Theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.onSurfaceVariant,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarStyle: {
                    backgroundColor: Theme.colors.surface,
                    position: 'absolute',
                    // Bỏ viền dưới vì thanh này thường nằm sát đáy màn hình
                    borderRadius: 24,
                    borderTopRightRadius: 24,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    height: 65, // Tăng nhẹ chiều cao để chứa vừa viên thuốc
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
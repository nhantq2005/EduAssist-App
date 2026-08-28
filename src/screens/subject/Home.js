import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Apis, { endpoints } from '../../utils/Apis';
import SubjectItem from '../../components/SubjectItem';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/HomeStyle';
import { MyUserContext } from '../../utils/MyContexts';

const Home = () => {
  const [user,] = useContext(MyUserContext);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();
  const COLOR = ['#4F46E5', '#10b981', '#f59e0b', '#ec4899'];

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const res = await Apis.get(endpoints['getSubjects']);
      setSubjects(res.data);
      console.log('Danh sách môn học:', res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách môn học:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>Xin chào, {user.name}</Text>
          <Text style={styles.title}>Khóa học của bạn</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={24} color="#4F46E5" />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        < FlatList
          data={subjects}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <SubjectItem
              subject={item}
              iconName="book"
              color={COLOR[index % 4]}
              onPress={() => nav.navigate('Subject', { subjectId: item.id })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={64} color="#cbd5e1" />
              <Text style={styles.emptyText}>Chưa có khóa học nào.</Text>
              <Text style={styles.emptySubText}>Các khóa học bạn tham gia sẽ xuất hiện ở đây.</Text>
            </View>
          }
        />
      )}

    </SafeAreaView>
  );
};

export default Home;
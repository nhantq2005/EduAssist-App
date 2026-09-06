import React, { useState, useEffect, useContext } from 'react';
import { COLORS } from "../../styles/theme";
import { View, Text, FlatList, ActivityIndicator, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
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
  const [name, setName] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();
  const COLOR = [COLORS.primary, COLORS.success, '#f59e0b', '#ec4899'];

  const loadSubjects = async () => {
    try {
      setLoading(true);
      let url = endpoints['getSubjects']+`?limit=100&offset=${offset}`;
      if (name) {
        url += `&name=${encodeURIComponent(name)}`;
      }
      const res = await Apis.get(url);
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

  useEffect(() => {
     const timer = setTimeout(() => {
            loadSubjects();
        }, 500);

        return () => clearTimeout(timer);
  }, [name]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>Xin chào, {user?.name || 'Sinh viên'}</Text>
          <Text style={styles.title}>Khóa học của bạn</Text>
        </View>
        <View style={styles.avatarContainer}>
          {user?.avatar_url ? (
            <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          ) : (
            <Ionicons name="person" size={24} color={COLORS.primary} />
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.subText} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm khóa học..."
          placeholderTextColor={COLORS.subText}
          value={name}
          onChangeText={setName}
        />
        {name ? (
          <TouchableOpacity onPress={() => setName('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={18} color={COLORS.subText} />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
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
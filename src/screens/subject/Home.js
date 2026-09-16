import React, { useState, useEffect, useContext } from 'react';
import { COLORS } from "../../styles/theme";
import { View, Text, FlatList, ActivityIndicator, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Search, XCircle, FolderOpen } from 'lucide-react-native';
import Apis, { endpoints } from '../../utils/Apis';
import SubjectItem from '../../components/SubjectItem';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/HomeStyle';
import { MyUserContext } from '../../utils/MyContexts';

const LIMIT = 20;

const Home = () => {
  const [user,] = useContext(MyUserContext);
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const nav = useNavigation();
  const COLOR = ['#2563EB', '#10B981', '#f59e0b', '#ec4899'];

  const loadSubjects = async (currentOffset = 0, isRefreshing = false) => {
    if (isRefreshing) {
      setLoading(true);
    } else if (currentOffset > 0) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      let url = '';
      if (user?.role === 'LECTURER') {
        url = endpoints['getSubjectByLecturerId'](user.id) + `?limit=${LIMIT}&offset=${currentOffset}`;
      } else {
        url = endpoints['getSubjects'] + `?limit=${LIMIT}&offset=${currentOffset}`;
      }
      
      if (name) {
        url += `&name=${encodeURIComponent(name)}`;
      }
      
      const res = await Apis.get(url);
      const newData = res.data || [];
      
      if (newData.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (currentOffset === 0) {
        setSubjects(newData);
      } else {
        setSubjects(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách môn học:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const handleRefresh = () => {
    setOffset(0);
    loadSubjects(0, true);
  };

  const handleLoadMore = () => {
    if (!loading && !loadingMore && hasMore) {
      const nextOffset = offset + LIMIT;
      setOffset(nextOffset);
      loadSubjects(nextOffset);
    }
  };

  useEffect(() => {
    setOffset(0);
    loadSubjects(0, true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(0);
      loadSubjects(0, true);
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
            <User size={24} color={COLORS.primary} />
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.subText} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm khóa học..."
          placeholderTextColor={COLORS.subText}
          value={name}
          onChangeText={setName}
        />
        {name ? (
          <TouchableOpacity onPress={() => setName('')} style={styles.clearButton}>
            <XCircle size={18} color={COLORS.subText} />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading && subjects.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={loading}
          onRefresh={handleRefresh}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" color={COLORS.primary} />
              </View>
            ) : null
          }
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
              <FolderOpen size={64} color="#cbd5e1" />
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
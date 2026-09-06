import React, { useContext } from 'react';
import { COLORS } from "../styles/theme";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Trash } from 'lucide-react-native';
import { MyUserContext } from '../utils/MyContexts';

const DocumentItem = ({ title, size, date, fileType = 'pdf', onPress, onDelete }) => {
  const [user,] = useContext(MyUserContext);
  const iconColor = {'pdf': COLORS.error, 'doc': '#3b82f6', 'docx': '#3b82f6', 'ppt': '#f59e0b', 'pptx': '#f59e0b'}[fileType.toLowerCase()] || '#8b5cf6';
  const iconName = {'pdf': 'document-text', 'doc': 'document', 'docx': 'document', 'ppt': 'easel', 'pptx': 'easel'}[fileType.toLowerCase()] || 'document-attach';

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={iconName} size={28} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{size}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{date}</Text>
        </View>
      </View>
      {user.role === 'LECTURER' && (
        <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
          <Trash size={20} color={COLORS.error} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default DocumentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d1d5db',
    marginHorizontal: 8,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
});

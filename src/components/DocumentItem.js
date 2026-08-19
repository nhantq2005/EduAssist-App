import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DocumentItem({ title, size, date, fileType = 'pdf', onPress }) {
  const getIconColor = () => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '#ef4444';
      case 'doc':
      case 'docx': return '#3b82f6';
      case 'ppt':
      case 'pptx': return '#f59e0b';
      default: return '#8b5cf6';
    }
  };

  const getIconName = () => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'document-text';
      case 'doc':
      case 'docx': return 'document';
      case 'ppt':
      case 'pptx': return 'easel';
      default: return 'document-attach';
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: `${getIconColor()}15` }]}>
        <Ionicons name={getIconName()} size={28} color={getIconColor()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{size}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionBtn}>
        <Ionicons name="download-outline" size={22} color="#6b7280" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    color: '#1f2937',
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

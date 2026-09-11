import React from 'react';
import { COLORS } from "../styles/theme";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Book, CircleUser, ChevronRight } from 'lucide-react-native';

const SubjectItem = ({ subject, iconName, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{subject.name}</Text>
          {subject.code && (
            <View style={[styles.codeBadge, { backgroundColor: `${color}15` }]}>
              <Text style={[styles.codeText, { color }]}>{subject.code}</Text>
            </View>
          )}
        </View>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Book size={24} color={color} />
        </View>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {subject.description}
      </Text>
      
      <View style={styles.footerRow}>
        {subject.lecturer ? (
          <View style={styles.lecturerContainer}>
            <CircleUser size={16} color="#6b7280" />
            <Text style={styles.lecturerName}>{subject.lecturer.name}</Text>
          </View>
        ) : <View />}
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
}

export default SubjectItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.05)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.title,
    marginBottom: 6,
  },
  codeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  lecturerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  lecturerName: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
    marginLeft: 6,
  },
});

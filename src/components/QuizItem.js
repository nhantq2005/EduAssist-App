import React, { useContext } from 'react';
import { COLORS } from "../styles/theme";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, Pencil, Trash2, HelpCircle, ChevronRight } from 'lucide-react-native';
import { MyUserContext } from '../utils/MyContexts';

const QuizItem = ({ item, onPress, onDelete, onEdit }) => {
  const [user,] = useContext(MyUserContext);
  const isCompleted = item.score !== undefined && item.score !== null;
  const difficultyMapping = {
    EASY: { color: COLORS.success, text: 'Dễ' },
    MEDIUM: { color: '#f59e0b', text: 'Trung bình' },
    HARD: { color: COLORS.error, text: 'Khó' },
  };

  const difficultyLevel = item.difficulty_level?.toUpperCase();
  const currentDiff = difficultyMapping[difficultyLevel] || { color: '#3b82f6', text: difficultyLevel || 'Quiz' };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.badgesContainer}>
          <View style={[styles.difficultyBadge, { backgroundColor: `${currentDiff.color}15` }]}>
            <View style={[styles.dot, { backgroundColor: currentDiff.color }]} />
            <Text style={[styles.difficultyText, { color: currentDiff.color }]}>
              {currentDiff.text}
            </Text>
          </View>

          {item.source_type === 'AI_GENERATED' && (
            <View style={styles.aiBadge}>
              <Sparkles size={12} color="#8b5cf6" style={styles.aiIcon} />
              <Text style={styles.aiText}>AI Sinh</Text>
            </View>
          )}
        </View>

        <View style={styles.headerRight}>
          {isCompleted && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{item.score} đ</Text>
            </View>
          )}
          {user?.id === item.created_by && (
            <>
                <TouchableOpacity onPress={onEdit} style={styles.actionButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Pencil size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.actionButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Trash2 size={20} color={COLORS.error} />
                </TouchableOpacity>
            </>
           )} 
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

      {item.description ? (
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.metaInfo}>
          <View style={styles.iconBox}>
            <HelpCircle size={16} color={COLORS.success} />
          </View>
          <Text style={styles.metaText}>Trắc nghiệm</Text>
        </View>

        <ChevronRight size={20} color="#cbd5e1" style={{ marginLeft: 'auto' }} />
      </View>
    </TouchableOpacity>
  );
}

export default QuizItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.iconBg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ede9fe',
    marginLeft: 8,
  },
  aiIcon: {
    marginRight: 4,
  },
  aiText: {
    color: '#8b5cf6',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.title,
    marginBottom: 6,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: COLORS.subText,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.iconBg,
    paddingTop: 16,
    marginTop: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});

import React from 'react';
import { COLORS } from "../styles/theme";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ChatItem = ({ name, avatarUrl, lastMessage, time, unreadCount, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.placeholderText}>{name?.charAt(0).toUpperCase() || '?'}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
          <Text style={[styles.timeText, unreadCount > 0 && styles.timeTextUnread]}>{time}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={[styles.messageText, unreadCount > 0 && styles.messageTextUnread]} numberOfLines={2}>
            {lastMessage}
          </Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  placeholderAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#818cf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.title,
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  timeTextUnread: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
    marginRight: 12,
  },
  messageTextUnread: {
    color: COLORS.text,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});

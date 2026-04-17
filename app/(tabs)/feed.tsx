import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { feedPosts } from '@/constants/mockData';
import { fonts, theme } from '@/constants/theme';

const badgeColors = {
  Buy: '#1D6B40',
  Sell: '#783521',
  Thesis: '#23317B',
} as const;

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.heading}>Feed</Text>
        <View style={styles.toggleWrap}>
          <Text style={styles.toggleText}>Friends only</Text>
          <Switch
            value={false}
            thumbColor="#E8E8EF"
            trackColor={{ true: '#4B5DFF', false: '#1B1D2F' }}
            ios_backgroundColor="#1B1D2F"
            style={styles.toggle}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {feedPosts.map((post) => (
          <View key={post.id} style={styles.postSection}>
            <View style={styles.rowTop}>
              <View style={[styles.avatar, post.user === 'fomo' ? styles.avatarBrand : styles.avatarUser]}>
                <Text style={styles.avatarText}>{post.user === 'fomo' ? '∞' : post.user.slice(0, 1).toUpperCase()}</Text>
              </View>

              <View style={styles.authorWrap}>
                <View style={styles.authorRow}>
                  <Text style={styles.user}>{post.user}</Text>
                  {post.label ? <Text style={[styles.tag, { backgroundColor: badgeColors[post.label as keyof typeof badgeColors] }]}>{post.label}</Text> : null}
                  <Text style={styles.age}>{post.age}</Text>
                </View>
              </View>

              {post.pinned ? (
                <View style={styles.pinned}>
                  <FontAwesome6 name="thumbtack" size={11} color={theme.colors.textMuted} />
                  <Text style={styles.pinnedText}>Pinned</Text>
                </View>
              ) : null}
            </View>

            {post.type === 'Recap' ? (
              <View style={styles.recapCard}>
                <View style={styles.recapHeader}>
                  <FontAwesome6 name="note-sticky" size={12} color={theme.colors.textPrimary} />
                  <Text style={styles.recapTitle}>{post.title}</Text>
                </View>
                <Text style={styles.recapBody}>• {post.body}</Text>
                <Text style={styles.readMore}>Read more</Text>
              </View>
            ) : (
              <View style={styles.regularWrap}>
                <Text style={styles.postText}>{post.body}</Text>
                {post.position ? (
                  <View style={styles.positionCard}>
                    <View style={styles.positionLeft}>
                      <View style={styles.positionAvatar}>
                        <Text style={styles.positionAvatarText}>{post.position.slice(0, 1)}</Text>
                      </View>
                      <View>
                        <Text style={styles.positionLabel}>Position</Text>
                        <Text style={styles.position}>{post.position}</Text>
                      </View>
                    </View>
                    <View style={styles.positionRight}>
                      <Text style={styles.positionValue}>{post.value}</Text>
                      <Text style={styles.positionPnl}>▲ {post.pnl}</Text>
                    </View>
                  </View>
                ) : null}
              </View>
            )}

            {post.reactions ? (
              <View style={styles.reactionPill}>
                <Text style={styles.reactionIcon}>∞</Text>
                <Text style={styles.reactionCount}>{post.reactions}</Text>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingBottom: 120,
  },
  header: {
    marginTop: 6,
    marginBottom: 2,
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(117, 123, 161, 0.16)',
  },
  heading: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontFamily: fonts.headingSemi,
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleText: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  toggle: {
    transform: [{ scaleX: 0.86 }, { scaleY: 0.86 }],
  },
  postSection: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(117, 123, 161, 0.14)',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBrand: {
    backgroundColor: '#4A63FF',
  },
  avatarUser: {
    backgroundColor: '#232846',
  },
  avatarText: {
    color: '#E9EBFF',
    fontFamily: fonts.headingSemi,
    fontSize: 24,
  },
  authorWrap: {
    marginLeft: 12,
    flex: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  user: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 20,
  },
  age: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 12,
  },
  pinned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pinnedText: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 12,
  },
  recapCard: {
    marginTop: 12,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(117, 122, 166, 0.25)',
    backgroundColor: '#151829',
  },
  recapHeader: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    backgroundColor: '#1E2234',
  },
  recapTitle: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 20,
  },
  recapBody: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.bodyRegular,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  readMore: {
    color: theme.colors.accentBlue,
    fontFamily: fonts.headingSemi,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  regularWrap: {
    marginTop: 12,
    gap: 10,
  },
  postText: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.bodyRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  positionCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(118, 124, 172, 0.24)',
    backgroundColor: '#15192A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  positionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  positionAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#212640',
    borderWidth: 1,
    borderColor: 'rgba(118, 124, 172, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionAvatarText: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 14,
  },
  positionLabel: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 13,
  },
  position: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 16,
  },
  positionRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  positionValue: {
    color: theme.colors.textPrimary,
    fontFamily: fonts.headingSemi,
    fontSize: 18,
  },
  positionPnl: {
    color: theme.colors.profit,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  tag: {
    color: '#DCE3FF',
    fontFamily: fonts.headingSemi,
    fontSize: 12,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  reactionPill: {
    marginTop: 12,
    width: 86,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#131727',
    borderWidth: 1,
    borderColor: 'rgba(118, 124, 172, 0.24)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  reactionIcon: {
    color: '#D8DCFF',
    fontFamily: fonts.headingSemi,
    fontSize: 18,
  },
  reactionCount: {
    color: theme.colors.textMuted,
    fontFamily: fonts.body,
    fontSize: 13,
  },
});
